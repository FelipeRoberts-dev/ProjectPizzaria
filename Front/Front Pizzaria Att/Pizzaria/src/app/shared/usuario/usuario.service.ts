import { Injectable } from '@angular/core';
import { Usuarios } from './usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { EMPTY } from 'rxjs';
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
                'Ocorreu um erro ao excluir o usuário.',
                'error'
              );
              observer.error(error);
              return EMPTY;
            })
          ).subscribe(() => {
            swalWithBootstrapButtons.fire(
              'Excluído!',
              'O usuário  foi excluído com sucesso.',
              'success'
            ).then(() => {
              observer.next();
              observer.complete();
            });
          });
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'A exclusão do usuário foi cancelado.',
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
