import { MateriaPrimaFiltros } from './../produtosFiltro.model';
import { Produtos } from './../produtos.model';
import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef  } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportExcelService } from '../../export-excel.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { DialogRefComponent } from '../../dialog-ref/dialog-ref.component';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.scss']
})
export class ProdutoReadComponent implements OnInit {



  

  //Objeto produto para deleção
  produto: Produtos

  //Caminho Para realizar o download do excel
  caminhoArquivo: string;

  //Obejto materia prima filtro
  MateriaPrimaFiltros = new MateriaPrimaFiltros();

  //Array que será nossa fonte de dados que sera carregado, tipo MatTableDataSource porq contém metódos para paginação
  produtosArray: MatTableDataSource<Produtos>;

  //Definir colunas
  dados = ['descricao', 'estoque', 'action']

  //Comecar com a modal excel fechada
  templateModal: boolean = false;

    // Adicionar Paginação variavel.
    @ViewChild(MatPaginator) paginator: MatPaginator;

    //Adicionar sort apos clicar header
    @ViewChild(MatSort) sort: MatSort;

    //Renderizar template modal
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>

  constructor(
    private produtosService: ProdutoService,
    private paginatorIntl: MatPaginatorIntl,
    private rotaCarregarId: ActivatedRoute,
    private gerarExcelService: ExportExcelService,
    private router: Router,
    public dialog: MatDialog,
    private viewContainerRef:  ViewContainerRef

  ) {}

  ngOnInit(): void {
    this.carregarForm();
  }

  carregarForm(){
    this.produtosService.listar().subscribe(produtos => {
      this.produtosArray = new MatTableDataSource<Produtos>(produtos);
      this.carregarPaginacao();
      this.carregarOrdenacao();

    });
  }

  abrirDialog(){
    console.log("Dados do array", this.produtosArray)

    //verifica se tabela ta preenchida
    if(this.produtosArray.filteredData == null || this.produtosArray.filteredData.length === 0){
      this.produtosService.construirMessage("Necessarios dados na tabela, para geração da exportação.")
      return
    }

    this.templateModal = true;

    const dialogRef = this.dialog.open(DialogRefComponent, {
      width: '500px',
      height: '300px',
      disableClose: true,
      data: { produtosArray: this.produtosArray }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Finalizando Dialog')
    })
  }

  carregarPaginacao(){
      this.produtosArray.paginator = this.paginator;

       //Troca a label paginação;
       this.paginator._intl.itemsPerPageLabel = 'Registros por Páginas';
       this.paginatorIntl.nextPageLabel = 'Próxima página';
       this.paginatorIntl.previousPageLabel = 'Página anterior';

       //Garantir que o valor do end não ultrapasse o número total de itens (nosso length)
       this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
         const start = page * pageSize + 1;
         const end = Math.min((page + 1) * pageSize, length);
         return `${start} – ${end} de ${length}`;
       };
  }

  carregarOrdenacao() {
    this.produtosArray.sortingDataAccessor = (item: Produtos, property) => {
    switch(property) {
    case 'descricao': return item.descricao;
    case 'estoque': return item.estoque;
    default: return '';
    }
    };
    
    
    this.produtosArray.sort = this.sort; // habilitar ordenação

    }


   
    carregarIdExclusao(id: string){
      
       this.produtosService.lerId(id).subscribe(produtoParam => {

          this.produto = produtoParam

          const idExcluir: string = this.produto.id.toString();

          this.produtosService.excluir(idExcluir);


       })
      }

    
    pesquisar(){

      if (this.MateriaPrimaFiltros.valor_LIKE && this.MateriaPrimaFiltros.valor_LIKE.trim() !== "") {
        this.MateriaPrimaFiltros.criterio_IGUAL = "";
        this.MateriaPrimaFiltros.criterio_LIKE = "LIKE";
      }
      
      if (this.MateriaPrimaFiltros.valor_IGUAL && this.MateriaPrimaFiltros.valor_IGUAL.trim() !== "") {
        this.MateriaPrimaFiltros.criterio_LIKE = "";
        this.MateriaPrimaFiltros.criterio_IGUAL = "=";
      }

      this.produtosService.listarFiltrado(this.MateriaPrimaFiltros).subscribe(
        produtos => {
          if (produtos && produtos.length > 0) {
            this.produtosArray.data = produtos
            this.produtosArray.paginator.firstPage();
            this.carregarOrdenacao();
          } else {
            this.produtosArray.data = []
            this.produtosService.construirMessagemSemRegistros("Não há registros cadastrados com os filtros selecionados")
          }
        },
        error => console.log(error)
      )
    }
  

    limpar(){
      if(this.MateriaPrimaFiltros.valor_LIKE!= null || this.MateriaPrimaFiltros.valor_IGUAL != null){
       this.MateriaPrimaFiltros.valor_LIKE = "";
       this.MateriaPrimaFiltros.valor_IGUAL = "";
      }
    }


    


    navigateProdutoCriar(): void {
      this.router.navigate(['/materia-prima/criar'])
    }
    



}
