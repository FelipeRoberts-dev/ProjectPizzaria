import { Produtos } from './../produtos.model';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.scss']
})
export class ProdutoReadComponent implements OnInit {

  //Array que será nossa fonte de dados que sera carregado, tipo MatTableDataSource porq contém metódos para paginação
  produtosArray: MatTableDataSource<Produtos>;

  //Definir colunas
  dados = ['descricao', 'estoque', 'action']

    // Adicionar Paginação variavel.
    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtosService: ProdutoService,
    private paginatorIntl: MatPaginatorIntl

  ) {}

  ngOnInit(): void {
    this.carregarForm();
  }

  carregarForm(){
    this.produtosService.listar().subscribe(produtos => {
      this.produtosArray = new MatTableDataSource<Produtos>(produtos);
      this.carregarPaginacao();

    });
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

}
