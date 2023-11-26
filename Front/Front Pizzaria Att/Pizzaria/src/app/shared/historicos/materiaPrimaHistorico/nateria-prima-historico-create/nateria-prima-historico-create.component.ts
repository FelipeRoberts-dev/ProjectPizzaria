import { HistoricoMateriaPrima } from './../materia-prima-historico.model';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/shared/produto/produto.service';
import { HistoricoMateriaPrimaService } from '../materia-prima-historico.service';
import { Router }  from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Produtos } from 'src/app/shared/produto/produtos.model';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-nateria-prima-historico-create',
  templateUrl: './nateria-prima-historico-create.component.html',
  styleUrls: ['./nateria-prima-historico-create.component.scss']
})
export class HistoricoMateriaPrimasCriarComponent {

  historicoMateriaPrimas = new HistoricoMateriaPrima();

  public historicoMateriaPrimasForm: FormGroup;

  listaMateriaPrimas: any[] = [];
  selectedOption:any;
  
  

  
  constructor(
    private produtoservice: ProdutoService,
    private fb: FormBuilder,
    private router: Router,
    private historicoMateriaPrimasService: HistoricoMateriaPrimaService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {

    this.historicoMateriaPrimasForm = this.fb.group({
      materiaPrimaID: ['', Validators.required],
      dataHistorico: [null, Validators.required],
      descricao: ['', Validators.required]
    });

    
    this.definirDataAtual();
    this.carregarOpcoes();
  }



  criarHistoricoMateriaPrimas() {
    
    if (this.historicoMateriaPrimasForm.valid) {
      this.historicoMateriaPrimasService.criar(this.historicoMateriaPrimas).subscribe(() => {
        this.produtoservice.construirMessage('Histórico inserido com sucesso');
        this.router.navigate(['/materia-prima-historico']);
      });
    } else {
      // exibir mensagem de erro
      this.produtoservice.construirMessage('Preencha todos os campos obrigatórios');
    }
  }

  cancelar(): void {
    this.router.navigate(['/materia-prima-historico']);
    this.historicoMateriaPrimasForm.reset();
  }

  carregarOpcoes() {
    this.produtoservice.listar().subscribe(
      (result) => {
        this.listaMateriaPrimas = result; // Supondo que seu serviço retorna uma lista de objetos, ajuste conforme necessário
      },
      (error) => {
        console.error('Erro ao carregar opções:', error);
      }
    );
  }

  selecionarMateriaPrima(event: any) {
    // event.value conterá o objeto da opção selecionada
    this.historicoMateriaPrimas.materiaPrimaID = event.value.id; // ou ajuste conforme a estrutura do seu objeto
  }

  definirDataAtual(): void {
    const dataAtual = new Date().toISOString().split('T')[0];
    this.historicoMateriaPrimasForm.get('dataHistorico').setValue(dataAtual);
  }
  
}


