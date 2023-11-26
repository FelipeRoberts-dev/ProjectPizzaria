import { HistoricoMateriaPrimaService } from './../materia-prima-historico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricoMateriaPrima } from '../materia-prima-historico.model';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-materiaprima-prima-historico-read',
  templateUrl: './materiaprima-prima-historico-read.component.html',
  styleUrls: ['./materiaprima-prima-historico-read.component.scss']
})
export class MateriaprimaPrimaHistoricoReadComponent implements OnInit {

  //Objeto para deleção
  historicoMateriaPrima: HistoricoMateriaPrima
  
  //Array que será nossa fonte de dados que sera carregado, tipo MatTableDataSource porq contém metódos para paginação
  historicosMateriaPrimaArray: MatTableDataSource<HistoricoMateriaPrima>;


  //Definir colunas
  dados = ['descricaoMateriaPrima', 'descricao', 'dataHistorico', 'action']
  

    // Adicionar Paginação variavel.
    @ViewChild(MatPaginator) paginator: MatPaginator;

    //Adicionar sort apos clicar header
    @ViewChild(MatSort) sort: MatSort;


    constructor(
      private HistoricoMateriaPrimaService: HistoricoMateriaPrimaService,
      private paginatorIntl: MatPaginatorIntl,
      private rotaCarregarId: ActivatedRoute,
      private router: Router,  
      private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
      this.carregarForm();
      this.carregarPaginacao();
      this.carregarOrdenacao();
    }

    carregarForm() {
      this.HistoricoMateriaPrimaService.listar().subscribe(historicos => {
        // Formate a data antes de atribuir à fonte de dados
        historicos.forEach(historico => {
          historico.dataHistorico = this.datePipe.transform(historico.dataHistorico, 'dd/MM/yyyy');
        });
  
        this.historicosMateriaPrimaArray = new MatTableDataSource<HistoricoMateriaPrima>(historicos);
      });
    }

    carregarPaginacao() {
      // Usar setTimeout para garantir que o paginator esteja disponível
      setTimeout(() => {
        this.historicosMateriaPrimaArray.paginator = this.paginator;
    
        //Troca a label paginação;
        this.paginator._intl.itemsPerPageLabel = 'Registros por Páginas';
        this.paginatorIntl.nextPageLabel = 'Próxima página';
        this.paginatorIntl.previousPageLabel = 'Página anterior';
    
        //Garantir que o valor do end não ultrapasse o número total de itens (nosso length)
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = Math.min((page + 1) * pageSize, length);
          return `${start} – ${end} de ${length}`;
        };
      });6
    }
    

  carregarOrdenacao() {
    this.historicosMateriaPrimaArray.sortingDataAccessor = (item: HistoricoMateriaPrima, property) => {
    switch(property) {
    case 'descricaoMateriaPrima': return item.DescricaoMateriaPrima;
    case 'dataHistorico': return item.dataHistorico;
    case 'descricao': return item.descricao;
    default: return '';
    }
    };
    
    
    this.historicosMateriaPrimaArray.sort = this.sort; // habilitar ordenação

    }



    navigateHistoricoMateriaPrimaCriar(): void {
      this.router.navigate(['/materia-prima-historico/criar'])
    }

    carregarIdExclusao(id: string) {
      this.HistoricoMateriaPrimaService.lerId(id).subscribe(historiParam => {
        this.historicoMateriaPrima = historiParam;
    
        const idExcluir: string = this.historicoMateriaPrima.historicoID.toString();
    
        this.HistoricoMateriaPrimaService.excluir(idExcluir).subscribe(() => {
          // Remover o produto excluído do array de produtos
          this.historicosMateriaPrimaArray.data = this.historicosMateriaPrimaArray.data.filter(item => item.historicoID !== parseInt(idExcluir));

    
          // Atualizar a lista
          this.HistoricoMateriaPrimaService.listar();
        });
      });
    }
   

}
