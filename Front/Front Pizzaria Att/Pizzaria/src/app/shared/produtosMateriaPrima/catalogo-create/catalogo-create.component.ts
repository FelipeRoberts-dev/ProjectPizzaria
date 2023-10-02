import { ProdutoService } from './../../produto/produto.service';
import { ProdutosmateriaprimaService } from './../produtosmateriaprima.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdustosMateriaPrima } from '../produtosMateriaPrima.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-catalogo-create',
  templateUrl: './catalogo-create.component.html',
  styleUrls: ['./catalogo-create.component.scss']
})
export class CatalogoCreateComponent implements OnInit {

  public produtosMateriaPrima = new ProdustosMateriaPrima();

  public produtoMateriaPrima: FormGroup;


  constructor(
    private ProdutoService: ProdutosmateriaprimaService,
    private fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(): void {
    this.carregarFormGroup();
  }


  carregarFormGroup(){
    this.produtoMateriaPrima = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }


  criarProdutoMateriaPrima() {
    if (this.produtoMateriaPrima.valid) {
      this.ProdutoService.criar(this.produtosMateriaPrima).subscribe(() => {
        this.ProdutoService.construirMessage('Produto inserido no Catálogo com sucesso');
        this.router.navigate(['/produtos']);
      });
    } else {
      // exibir mensagem de erro
      this.ProdutoService.construirMessage('Preencha todos os campos obrigatórios');
    }
  }


  cancelar(): void {
    this.router.navigate(['/produtos']);
    this.produtoMateriaPrima.reset();
  }

  



}
