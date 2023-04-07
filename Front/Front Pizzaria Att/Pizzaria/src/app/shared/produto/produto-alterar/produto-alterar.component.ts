import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router }  from '@angular/router'
import { Produtos } from '../produtos.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-produto-alterar',
  templateUrl: './produto-alterar.component.html',
  styleUrls: ['./produto-alterar.component.scss']
})
export class ProdutoAlterarComponent implements OnInit {

  produto = new Produtos();
  public produtoForm: FormGroup;


  constructor(
    private produtoservice: ProdutoService,
    private fb: FormBuilder,
    private router: Router,
    private rotaCarregarId: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.carregarFormGroup();
    this.carregarId();
  }

  //Carregar objeto para alteração.
  carregarId(){
    //Carregando o id na rota, pegando os parametros.
    const id = this.rotaCarregarId.snapshot.paramMap.get('id')

    this.produtoservice.lerId(id).subscribe(produtoParam => {
      this.produto = produtoParam;
    })
  }

  carregarFormGroup(){
    this.produtoForm = this.fb.group({
      descricao: ['', Validators.required],
      estoque: ['', Validators.required]
    });
  }





  cancelar(): void {
    this.router.navigate(['/materia-prima']);
    this.produtoForm.reset();
  }

  alterarProduto(): void{
    if (this.produtoForm.valid) {
      this.produtoservice.alterar(this.produto).subscribe(() => {
        this.produtoservice.construirMessage('Matéria Prima atualizada com sucesso')
        this.router.navigate(["/materia-prima"])
      })
    } else {
      // exibir mensagem de erro
      this.produtoservice.construirMessage('Preencha todos os campos obrigatórios');
    }
    

  }


  codigoValidator(control: FormControl) {
    const codigo = control.value;
    if (codigo && codigo.length > 8) {
      return { codigoInvalido: true };
    }
    return null;
  }



}
