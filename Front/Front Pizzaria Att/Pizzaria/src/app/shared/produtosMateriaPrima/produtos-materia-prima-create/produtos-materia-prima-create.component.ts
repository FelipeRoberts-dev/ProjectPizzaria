import { Component, OnInit } from '@angular/core';
import { ProdutosmateriaprimaService } from '../produtosmateriaprima.service';
import { Route, Router } from '@angular/router';
import { ProdustosMateriaPrima } from '../produtosMateriaPrima.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ProdutoService } from '../../produto/produto.service';

@Component({
  selector: 'app-produtos-materia-prima-create',
  templateUrl: './produtos-materia-prima-create.component.html',
  styleUrls: ['./produtos-materia-prima-create.component.scss']
})
export class ProdutosMateriaPrimaCreateComponent implements OnInit {

  produto = new ProdustosMateriaPrima();

  public produtoForm: FormGroup;


  //Array materia Prima
  materiasPrimas: any[] = []
  selecaoMateriaPrima: any;

  constructor(
    private produtosMateriaPrimaService: ProdutosmateriaprimaService,
    private fb: FormBuilder,
    private router: Router,
    private materiasPrimaService: ProdutoService
  ){}

  carregarFormGroup(){
    this.produtoForm = this.fb.group({
    codigo: ['', Validators.required],
    descricao: ['', Validators.required],
    quantidade: ['', Validators.required],
    materiaprimaid: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.carregarFormGroup();
    this.carregarCombos();
  }



  carregarCombos(){
    this.carregarMateriaPrimas();
  }

  carregarMateriaPrimas(){
    this.materiasPrimaService.listar().subscribe((data: any[]) => {
      this.materiasPrimas = data;
    });
  }

  criarProduto(){
    if (this.produtoForm.valid){
      this.produtosMateriaPrimaService.criar(this.produto).subscribe(() => {
        this.produtosMateriaPrimaService.construirMessage('Produto inserido com sucesso');
        this.router.navigate(['/produtos'])
      })
    }else{
      //exibir mensagem de erro

      this.produtosMateriaPrimaService.construirMessage('Preencha todos os campos obrigatórios (*)')
    }
  }

  cancelar(): void{
    this.router.navigate(['/produtos']);
    this.produtoForm.reset();
  }



  selecaoMateriaPrimaChanged(event: any) {
    this.selecaoMateriaPrima = event.value.toString(); // converter id selecionado para string (opcional)
    this.produto.materiaprimaid = event.value; //atribuindo o valor selecionado: o id da FK
    console.log(this.selecaoMateriaPrima); // printar dado selecionado na minha combo box
  }

  


}
