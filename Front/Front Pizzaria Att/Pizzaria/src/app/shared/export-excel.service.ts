import { GenerateExcelRequest } from './dialog-ref/excelMateriaPrimamodel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { environment } from 'src/enviroments/enviroment'
import { GeneratePdflRequest } from './dialog-ref/pdfMateriaPrimamodel';


@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  private baseUrl = `${environment.apiUrl}/ExcelGerar`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private exibirmsg: MatSnackBar,
    private http : HttpClient
  ) { }

  gerarExcel(generateExcelRequest: GenerateExcelRequest): Observable<Blob> {
    const url = `${this.baseUrl}/gerarExcel`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, generateExcelRequest, options);
  }

  gerarPdf(generatePdfRequest: GeneratePdflRequest): Observable<Blob> {
    const url = `${this.baseUrl}/gerarPdf`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, generatePdfRequest, options);
  }
  

}
