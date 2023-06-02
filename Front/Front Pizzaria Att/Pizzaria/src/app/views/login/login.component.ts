import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { Router }  from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  @Output() loginSucesso: EventEmitter<void> = new EventEmitter<void>();
  @Input() exibirLogin: boolean;

  nome: string = "";
  senha: string = "";
  public loginForm: FormGroup;

  loginEfetuadoToken = false;

constructor(
  private loginService: LoginServiceService,
  private fb: FormBuilder,
) {}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    nome: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });
}

loginEfetuado() {
  if (this.loginForm.valid) {
    const nome = this.loginForm.get('nome')?.value;
    const senha = this.loginForm.get('senha')?.value;
    
    this.loginService.login(nome, senha).subscribe(
      () => {
        this.loginService.construirMessage('Login efetuado com sucesso');
        this.loginSucesso.emit();
      },
      (error) => {
        if (error.status === 404) {
          // Usuário não encontrado
          this.loginService.construirMessage('Usuário não encontrado');
          return;
        } else {
          // Outro erro ocorreu
          this.loginService.construirMessage('Ocorreu um erro ao efetuar o login');
          return;
        }
      }
    );
  } else {
    // exibir mensagem de erro
    this.loginService.construirMessage('Preencha todos os campos obrigatórios');
  }
}


}
