import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos-materia-prima',
  templateUrl: './produtos-materia-prima.component.html',
  styleUrls: ['./produtos-materia-prima.component.scss']
})
export class ProdutosMateriaPrimaComponent implements OnInit {

constructor(private router: Router){}

ngOnInit(): void {
  
}

navigateProdutoCriar(): void{
  this.router.navigate(['/produtos/criar'])
}

}
