import { Usuarios } from './../usuarios.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router, RunGuardsAndResolvers }  from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios-alterar',
  templateUrl: './usuarios-alterar.component.html',
  styleUrls: ['./usuarios-alterar.component.scss']
})
export class UsuariosAlterarComponent implements OnInit {

  usuarios = new Usuarios();

  public UsuariosForm:FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router:Router,
    private rotaCarregarId: ActivatedRoute

  ){}

  ngOnInit(): void {
    this.carregarId();
    this.carregarFormGroup();
  }


  //Carregar objeto para alteração.
  carregarId(){
    //Carregando o id na rota, pegando os parametros

    const id = this.rotaCarregarId.snapshot.paramMap.get('id')

    this.usuarioService.lerId(id).subscribe(usuarioParam => {
      this.usuarios = usuarioParam
    })
  }


  carregarFormGroup(){
    this.UsuariosForm = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }



  cancelar(): void {
    this.router.navigate(['/usuarios'])
    this.UsuariosForm.reset();
  }

  alterarUsuarios():void{
    if (this.UsuariosForm.valid) {
      this.usuarioService.alterar(this.usuarios).subscribe(() => {
        this.usuarioService.construirMessage('Usuário atualizado com sucesso')
        this.router.navigate(["/usuarios"])
      })
    } else {
      // exibir mensagem de erro
      this.usuarioService.construirMessage('Preencha todos os campos obrigatórios');
    }
  }


  

}
