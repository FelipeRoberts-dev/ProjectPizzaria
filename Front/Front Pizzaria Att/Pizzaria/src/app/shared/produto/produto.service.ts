import { Produtos } from './produtos.model';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = `${environment.apiUrl}/MateriaPrima`;
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  


  constructor(
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

  excluir(id: string) : Observable<Produtos> {
    const url = `${this.baseUrl}/Excluir/${id}`;
    return this.http.delete<Produtos>(url).pipe(
      catchError((error) => {
        console.error('Erro ao excluir produto', error);
        return of(null);
      })
    )
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
