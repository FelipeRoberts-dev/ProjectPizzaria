import { ProdutoService } from './../produto.service';
import { Produtos } from './../produtos.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-produto-deletar',
  templateUrl: './produto-deletar.component.html',
  styleUrls: ['./produto-deletar.component.scss']
})
export class ProdutoDeletarComponent  implements OnInit{


  produto: Produtos

  desabilitarExclusao: boolean = true;

  constructor(
    private produtoservice: ProdutoService, 
    private rotaCarregarId: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(){
    this.carregarIdExclusao();
  }

  carregarIdExclusao(){
  //Carregando o id na rota, pegando os parametros.
  const id = this.rotaCarregarId.snapshot.paramMap.get('id')

   this.produtoservice.lerId(id).subscribe(produtoParam => {
     this.produto = produtoParam;
   })
  }

  deletarProduto(){

  }

  cancelar(){
    this.router.navigate(['/produtos']);
  }



}
