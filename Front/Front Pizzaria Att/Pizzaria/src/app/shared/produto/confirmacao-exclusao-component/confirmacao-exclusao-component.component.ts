import { ProdutoService } from './../produto.service';
import { Produtos } from './../produtos.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-exclusao-component',
  templateUrl: './confirmacao-exclusao-component.component.html',
  styleUrls: ['./confirmacao-exclusao-component.component.scss']
})
export class ConfirmacaoExclusaoComponentComponent implements OnInit {


  produto: Produtos

  constructor(
    private dialogExcluir: MatDialog,
    private produtoservice: ProdutoService,
    private rotaCarregarId: ActivatedRoute,
    
  ){}

  abrirModalExclusao(produto: Produtos){
    const dialogAbrir = this.dialogExcluir.open(ConfirmacaoExclusaoComponentComponent, {
      data: {
        titulo: 'Confirmação de exclusão',
        mensagem: `Tem certeza que deseja excluir o produto ${produto.descricao}?`
      }
    });

    dialogAbrir.afterClosed().subscribe(result => {
      if (result) {

      }
    })
    
    
  }
  
  ngOnInit(): void {
    this.carregarIdExclusao();
    
  }


  carregarIdExclusao(){
    //Carregando o id na rota, pegando os parametros.
    const id = this.rotaCarregarId.snapshot.paramMap.get('id')
  
     this.produtoservice.lerId(id).subscribe(produtoParam => {
       this.produto = produtoParam;
     })
    }
  

}
