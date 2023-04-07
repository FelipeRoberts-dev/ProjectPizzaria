import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  navigateProdutoCriar(): void {
    this.router.navigate(['/materia-prima/criar'])
  }

}
