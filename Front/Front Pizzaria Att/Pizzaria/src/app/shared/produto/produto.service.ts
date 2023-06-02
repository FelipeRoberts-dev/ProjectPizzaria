import { Produtos } from './produtos.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../../enviroments/enviroment'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { MateriaPrimaFiltros } from './produtosFiltro.model';
import { Route, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = `${environment.apiUrl}/MateriaPrima`;
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  


  constructor(
    private route: Router,
    private exibirmsg: MatSnackBar,
    private http : HttpClient
  ) { }

  construirMessage(msg : string) {
    this.exibirmsg.open(msg, 'Fechar',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  construirMessagemSemRegistros(msg: string){
    this.exibirmsg.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  criar(produto: Produtos) : Observable<Produtos> {
    const url = `${this.baseUrl}/Incluir`;
    return this.http.post<Produtos>(url, produto, this.httpOptions)
      .pipe(
        catchError(this.handleError<Produtos>('criar'))
      );
  }


  listar(): Observable<Produtos[]> {
    const url = `${this.baseUrl}/Listar`;
  
    return this.http.get<Produtos[]>(url).pipe(
      catchError((error) => {
        console.error('Erro ao listar produtos', error);
        return of([]);
      })
    );
  }

  listarFiltrado(filtro: MateriaPrimaFiltros): Observable<Produtos[]> {
    const url = `${this.baseUrl}/ListarFiltrado`;
    const filtroParametro = new HttpParams({fromObject: {
      campo: filtro.campo,
      criterio_IGUAL: filtro.criterio_IGUAL,
      criterio_LIKE: filtro.criterio_LIKE,
      valor_LIKE: filtro.valor_LIKE,
      valor_IGUAL: filtro.valor_IGUAL
    }});

    return this.http.get<Produtos[]>(url, {params: filtroParametro}).pipe(
      catchError((error) => {
        console.error('Erro ao listar produtos', error);
        return of([]);
      })
    );
  }

  lerId(id: string): Observable<Produtos> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Produtos>(url).pipe(
      catchError((error) => {
        console.error('Erro ao obter produto', error);
        return of(null);
      })
    );
  }


  alterar(produtos: Produtos): Observable<Produtos> {
    const url = `${this.baseUrl}/Alterar/${produtos.id}`;
    return this.http.put<Produtos>(url, produtos).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar produto', error);
        return of(null);
      })
    );
  }

  excluir(id: string): Observable<void> {
    const url = `${this.baseUrl}/Excluir/${id}`;
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      }
    });
  
    return new Observable<void>((observer) => {
      swalWithBootstrapButtons.fire({
        title: 'Deseja Excluir?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<span class="btn-label"><i class="fa fa-check"></i></span>Sim, excluir!',
        cancelButtonText: '<span class="btn-label"><i class="fa fa-times"></i></span>Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete<void>(url).pipe(
            catchError((error) => {
              console.error('Erro ao excluir produto', error);
              swalWithBootstrapButtons.fire(
                'Erro!',
                'Ocorreu um erro ao excluir a matéria prima.',
                'error'
              );
              observer.error(error);
              return EMPTY;
            })
          ).subscribe(() => {
            swalWithBootstrapButtons.fire(
              'Excluído!',
              'A matéria prima foi excluída com sucesso.',
              'success'
            ).then(() => {
              observer.next();
              observer.complete();
            });
          });
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'A exclusão da matéria prima foi cancelada.',
            'info'
          );
          observer.complete();
        }
      });
    });
  }
  
  
  
  
  
  

  private handleError<Produtos>(operation = 'operation', result?: Produtos) {
    return (error: any): Observable<Produtos> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as Produtos);
    };
  }
}
