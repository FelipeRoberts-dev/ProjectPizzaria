import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router }  from '@angular/router'
import { Produtos } from '../produtos.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss']
})
export class ProdutoCreateComponent implements OnInit {
  
   produto = new Produtos();
  
   public produtoForm: FormGroup;

   constructor(
     private produtoservice: ProdutoService,
     private fb: FormBuilder,
     private router: Router
   ) {}
   
    carregarFormGroup(){
      this.produtoForm = this.fb.group({
        codigo: ['', Validators.required],
        descricao: ['', Validators.required],
        estoque: ['', Validators.required]
      });
    }


   ngOnInit(): void {
     this.produtoForm = this.fb.group({
       descricao: ['', Validators.required],
       estoque: ['', Validators.required],
     });
   }
   criarProduto() {
    if (this.produtoForm.valid) {
      this.produtoservice.criar(this.produto).subscribe(() => {
        this.produtoservice.construirMessage('Matéria Prima inserido com sucesso');
        this.router.navigate(['/materia-prima']);
      });
    } else {
      // exibir mensagem de erro
      this.produtoservice.construirMessage('Preencha todos os campos obrigatórios');
    }
  }

  cancelar(): void {
    this.router.navigate(['/materia-prima']);
    this.produtoForm.reset();
  }



  codigoValidator(control: FormControl) {
    const codigo = control.value;
    if (codigo && codigo.length > 8) {
      return { codigoInvalido: true };
    }
    return null;
  }

}
