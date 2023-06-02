import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../../enviroments/enviroment'
import { Route, Router } from '@angular/router';
import { Usuarios } from '../../shared/usuario/usuarios.model'

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

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


  login(nome: string, senha: string): Observable<Usuarios> {
    const url = `${this.baseUrl}/Login/${nome}/${senha}`;
    return this.http.get<Usuarios>(url).pipe(
      catchError((error) => {
        console.error('Erro ao obter usuário', error);
        return throwError(error); //Retorna o erro como um Observable
      })
    );
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
