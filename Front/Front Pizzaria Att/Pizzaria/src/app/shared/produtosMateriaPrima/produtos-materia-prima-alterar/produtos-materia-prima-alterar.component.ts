import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './../../produto/produto.service';
import { ProdutosmateriaprimaService } from './../produtosmateriaprima.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdustosMateriaPrima } from '../produtosMateriaPrima.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-produtos-materia-prima-alterar',
  templateUrl: './produtos-materia-prima-alterar.component.html',
  styleUrls: ['./produtos-materia-prima-alterar.component.scss']
})
export class ProdutosMateriaPrimaAlterarComponent implements OnInit {

  produtosMateriaPrima = new ProdustosMateriaPrima();

  public produtoMateriaPrimasForm: FormGroup;

  constructor(
    private ProdutosmateriaprimaService: ProdutosmateriaprimaService,
    private fb: FormBuilder,
    private router: Router,
    private rotaCarregarId: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.carregarFormGroup();
    this.carregarId();
  }

  //Carregar objeto para alteração.
  carregarId(){
    //Carregando o id na rota, pegando os parametros.
    const id = this.rotaCarregarId.snapshot.paramMap.get('id')

    this.ProdutosmateriaprimaService.lerId(id).subscribe(produtoParam => {
      this.produtosMateriaPrima = produtoParam;
    })
  }

  carregarFormGroup(){
    this.produtoMateriaPrimasForm = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
    this.produtoMateriaPrimasForm.reset();
  }


  alterarProduto(): void{
    if (this.produtoMateriaPrimasForm.valid) {
      this.ProdutosmateriaprimaService.alterar(this.produtosMateriaPrima).subscribe(() => {
        this.ProdutosmateriaprimaService.construirMessage('Produto atualizado com sucesso')
        this.router.navigate(["/produtos"])
      })
    } else {
      // exibir mensagem de erro
      this.ProdutosmateriaprimaService.construirMessage('Preencha todos os campos obrigatórios');
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
