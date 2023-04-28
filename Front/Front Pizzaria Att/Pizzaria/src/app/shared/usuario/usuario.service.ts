import { Injectable } from '@angular/core';
import { Usuarios } from './usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private baseUrl = `${environment.apiUrl}/Usuarios`;


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


  criar(produto: Usuarios) : Observable<Usuarios> {
    const url = `${this.baseUrl}/Incluir`;
    return this.http.post<Usuarios>(url, produto, this.httpOptions)
      .pipe(
        catchError(this.handleError<Usuarios>('criar'))
      );
  }

  listar(): Observable<Usuarios[]>{
    const url = `${this.baseUrl}/Listar`;

   return this.http.get<Usuarios[]>(url).pipe(
    catchError((error) => {
      console.error('Erro ao listar usuarios', error)
      return of([]);
    })
   )
  }

  lerId(id: string): Observable<Usuarios> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuarios>(url).pipe(
      catchError((error) => {
        console.error('Erro ao obter Usuários', error);
        return of(null);
      })
    );
  }


  alterar(usuarios: Usuarios): Observable<Usuarios> {
    const url = `${this.baseUrl}/Alterar/${usuarios.id}`;
    return this.http.put<Usuarios>(url, usuarios).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar usuarios', error);
        return of(null);
      })
    );
  }


  excluir(id: string) : Observable<Usuarios> {
    const url = `${this.baseUrl}/Excluir/${id}`;
    return this.http.delete<Usuarios>(url).pipe(
      catchError((error) => {
        console.error('Erro ao excluir usuario', error);
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
