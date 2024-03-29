import { Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ForDirective } from './diretivas/for.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';


import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutosMateriaPrimaComponent } from './views/produtos-materia-prima/produtos-materia-prima.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './views/login/login.component';
import { AutenticacaoSistemaComponent } from './autenticacao-sistema/autenticacao-sistema.component';
import { SharedModule } from './shared/shared.module';
import { HistoricoMateriaPrimasComponent } from './views/historico-materia-primas/historico-materia-primas.component';

@NgModule({
  declarations: [
    AppComponent,
    ForDirective,
    ProdutosMateriaPrimaComponent,
    UsuariosComponent,
    LoginComponent,
    AutenticacaoSistemaComponent,
    HistoricoMateriaPrimasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
  ],
  exports : [
    ForDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
