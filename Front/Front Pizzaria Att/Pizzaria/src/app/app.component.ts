import { Component } from '@angular/core';
import { Router } from '@angular/router';
// your-app.js
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pizzaria';
  controleNavHeaderFooter = false;

  exibirLogin: boolean = true;

  constructor(
   private router: Router
  ){}

  loginEfetuado(){
    this.router.navigate(['/inicio'])
    this.controleNavHeaderFooter = true;
    this.exibirLogin = false;
  }
}
