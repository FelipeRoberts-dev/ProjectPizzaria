import { ProdutosmateriaprimaService } from './../produtosmateriaprima.service';
import { ProdustosMateriaPrima } from './../produtosMateriaPrima.model';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-produtos-materia-prima-red',
  templateUrl: './produtos-materia-prima-red.component.html',
  styleUrls: ['./produtos-materia-prima-red.component.scss']
})
export class ProdutosMateriaPrimaRedComponent implements OnInit {

//Array que será nossa fonte de dados que sera carregado
produtosArray: MatTableDataSource<ProdustosMateriaPrima>

//Array materia Prima
materiasPrimas: any[] = []
selecaoMateriaPrima: number;

//Definir colunas
dados = ['codigo', 'descricao', 'quantidade', 'descricaoMateriaPrima']
// Adicionar Paginação variavel.
@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(
  private produtosService: ProdutosmateriaprimaService,
  private paginatorIntl: MatPaginatorIntl

){}

ngOnInit(): void {
  this.carregarForm();
}

carregarForm(){
 this.consultarProdutos();
}

consultarProdutos(){
  this.produtosService.listar().subscribe(produtos => {
    this.produtosArray = new MatTableDataSource<ProdustosMateriaPrima>(produtos)
    this.carregarPaginacao();    
  })
  
}


carregarPaginacao(){
  this.produtosArray.paginator = this.paginator;

  //Troca a label paginação
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

/*carregarCombos(){
  this.carregarMateriaPrimas();
}*/


/*carregarMateriaPrimas(){
  this.produtosService.listarMateriaPrimas().subscribe(materiaPrimas => {
   this.materiasPrimas = materiaPrimas;
  })
}*/

}
