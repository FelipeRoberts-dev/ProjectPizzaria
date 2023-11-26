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


  alterarProduto(): void {
    if (this.produtoMateriaPrimasForm.valid) {
      // Verificar se o código contém apenas números usando uma expressão regular
      if (!/^\d+$/.test(this.produtosMateriaPrima.codigo.toString())) {
        // Exibir mensagem de erro se o código não contém apenas números
        this.ProdutosmateriaprimaService.construirMessage('O código deve conter apenas números');
      } else {
        // Chamar o serviço de alteração se o código for válido
        this.ProdutosmateriaprimaService.alterar(this.produtosMateriaPrima).subscribe(() => {
          this.ProdutosmateriaprimaService.construirMessage('Produto atualizado com sucesso');
          this.router.navigate(['/produtos']);
        });
      }
    } else {
      // Exibir mensagem de erro se algum campo obrigatório estiver em branco
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
