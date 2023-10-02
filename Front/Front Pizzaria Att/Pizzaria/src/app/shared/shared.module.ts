import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './templates/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './templates/footer/footer.component';
import { NavComponent } from './templates/nav/nav.component'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { InicioComponent } from '../views/inicio/inicio.component';
import {MatCardModule} from '@angular/material/card'
import { ProdutosComponent } from '../views/produtos/produtos.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProdutoCreateComponent } from './produto/produto-create/produto-create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {HttpClientModule}  from '@angular/common/http'

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoReadComponent } from './produto/produto-read/produto-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProdutoAlterarComponent } from './produto/produto-alterar/produto-alterar.component';
import { ProdutoDeletarComponent } from './produto/produto-deletar/produto-deletar.component';
import { ConfirmacaoExclusaoComponentComponent } from './produto/confirmacao-exclusao-component/confirmacao-exclusao-component.component'
import { MatIconModule } from '@angular/material/icon';
import { ProdutosMateriaPrimaRedComponent } from './produtosMateriaPrima/produtos-materia-prima-red/produtos-materia-prima-red.component';
import { MatSelectModule } from '@angular/material/select';
import { UsuariosRedComponent } from './usuario/usuarios-red/usuarios-red.component';
import { UsuariosCreateComponent } from './usuario/usuarios-create/usuarios-create.component';
import { MatSort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogRefComponent } from './dialog-ref/dialog-ref.component';
import { MatRadioModule } from '@angular/material/radio';
import { UsuariosAlterarComponent } from './usuario/usuarios-alterar/usuarios-alterar.component';
import { CatalogoCreateComponent } from './produtosMateriaPrima/catalogo-create/catalogo-create.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    InicioComponent,
    ProdutosComponent,
    ProdutoCreateComponent,
    ProdutoReadComponent,
    ProdutoAlterarComponent,
    ProdutoDeletarComponent,
    ConfirmacaoExclusaoComponentComponent,
    ProdutosMateriaPrimaRedComponent,
    UsuariosRedComponent,
    UsuariosCreateComponent,
    DialogRefComponent,
    UsuariosAlterarComponent,
    CatalogoCreateComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ProdutoCreateComponent,
    ProdutoReadComponent,
    ProdutoAlterarComponent,
    ProdutoDeletarComponent,
    ProdutosMateriaPrimaRedComponent,
    UsuariosRedComponent,
    UsuariosCreateComponent,
    MatRadioModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    
  ]
  
})
export class SharedModule { }
