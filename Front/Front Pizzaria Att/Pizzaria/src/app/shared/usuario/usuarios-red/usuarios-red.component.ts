import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios } from '../usuarios.model';
import { UsuarioService } from '../usuario.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
selector: 'app-usuarios-red',
templateUrl: './usuarios-red.component.html',
styleUrls: ['./usuarios-red.component.scss']
})
export class UsuariosRedComponent implements OnInit {

//Array que será nossa fonte de dados que será carregado, tipo MatTableDataSource porq contém métodos para paginação e ordenação
usuariosArray: MatTableDataSource<Usuarios>;

//Definir colunas
dados = ['nome', 'senha', 'action'];

//Adicionar variáveis para paginação e ordenação
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


//Objeto para deleção

usuario: Usuarios;

constructor(
private usuarioService: UsuarioService,
private paginatorIntl: MatPaginatorIntl
) {}

ngOnInit(): void {
this.carregarForm();
}

carregarForm() {
this.usuarioService.listar().subscribe(usuarios => {
this.usuariosArray = new MatTableDataSource<Usuarios>(usuarios);
this.carregarPaginacao();
this.carregarOrdenacao();
});
}

carregarPaginacao() {
this.usuariosArray.paginator = this.paginator;


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
this.usuariosArray.sortingDataAccessor = (item: Usuarios, property) => {
switch(property) {
case 'nome': return item.nome;
case 'senha': return item.senha;
default: return '';
}
};


this.usuariosArray.sort = this.sort; // habilitar ordenação
}


carregarIdExclusao(id: string) {
  this.usuarioService.lerId(id).subscribe(usuarioParam => {
    this.usuario = usuarioParam;

    const idExcluir: string = this.usuario.id.toString();

    this.usuarioService.excluir(idExcluir).subscribe(() => {
      // Remover o produto excluído do array de produtos
      this.usuariosArray.data = this.usuariosArray.data.filter(item => item.id !== parseInt(idExcluir));


      // Atualizar a lista
      this.usuarioService.listar();
    });
  });
}

}