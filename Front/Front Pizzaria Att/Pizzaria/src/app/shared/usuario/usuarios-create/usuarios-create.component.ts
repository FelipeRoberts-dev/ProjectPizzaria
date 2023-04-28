import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuarios } from '../usuarios.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.scss']
})
export class UsuariosCreateComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;


  usuarios = new Usuarios();

  public usuariosForm: FormGroup;

  constructor(
    private usuariosService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.carregarFormGroup();
  }

  carregarFormGroup(){
    this.usuariosForm = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  criarUsuario(){
    if (this.usuariosForm.valid){
      this.usuariosService.criar(this.usuarios).subscribe(() => {
        this.usuariosService.construirMessage('Usuário inserido com sucesso');
        this.router.navigate(['/usuarios']);
      });
    }else{
      //exibir mensagem de erro
      this.usuariosService.construirMessage('Preencha todos os campos obrigatórios (*)');
    }
  }

  cancelar(): void{
    this.router.navigate(['/usuarios']);
    this.usuariosForm.reset();
  }

}
