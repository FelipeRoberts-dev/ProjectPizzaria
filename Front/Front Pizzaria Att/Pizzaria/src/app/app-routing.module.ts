import { UsuariosCreateComponent } from './shared/usuario/usuarios-create/usuarios-create.component';
import { ProdutoDeletarComponent } from './shared/produto/produto-deletar/produto-deletar.component';
import { ProdutoCreateComponent } from './shared/produto/produto-create/produto-create.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent}  from './views/inicio/inicio.component'
import {ProdutosComponent} from './views/produtos/produtos.component'
import { ProdutoAlterarComponent } from './shared/produto/produto-alterar/produto-alterar.component';
import { ProdutosMateriaPrimaComponent } from './views/produtos-materia-prima/produtos-materia-prima.component';
import { ProdutosMateriaPrimaCreateComponent } from './shared/produtosMateriaPrima/produtos-materia-prima-create/produtos-materia-prima-create.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { LoginComponent } from './views/login/login.component';
import { AutenticacaoSistemaComponent } from './autenticacao-sistema/autenticacao-sistema.component';

const routes: Routes = [{
  path: "",
  pathMatch: 'full',
  redirectTo: 'login'
},
{
  path: "login",
  component: LoginComponent
},
{   
  path: 'inicio',
  component: InicioComponent
},
{
  path: "materia-prima",
  component: ProdutosComponent
},
  {
    path: "materia-prima/criar",
    component: ProdutoCreateComponent
  },
  {
    path: "materia-prima/alterar/:id",
    component: ProdutoAlterarComponent
  },
  {
    path: "materia-prima/deletar/:id",
    component: ProdutoDeletarComponent
  },
  {
    path: "produtos",
    component: ProdutosMateriaPrimaComponent
  },
  {
    path: "produtos/criar",
    component: ProdutosMateriaPrimaCreateComponent
  },
  {
    path: "usuarios",
    component: UsuariosComponent
  },
  {
    path: "usuarios/criar",
    component: UsuariosCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
