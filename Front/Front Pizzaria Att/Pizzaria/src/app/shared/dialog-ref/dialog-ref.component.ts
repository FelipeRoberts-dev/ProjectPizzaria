import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { Produtos } from '../produto/produtos.model';
import { ExportExcelService } from '../export-excel.service';
import { ProdutoService } from '../produto/produto.service';
import { GenerateExcelRequest } from './excelMateriaPrimamodel';
import { GeneratePdflRequest } from './pdfMateriaPrimamodel';
import { saveAs } from 'file-saver';
import * as XlsxPopulate from 'xlsx-populate';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-ref',
  templateUrl: './dialog-ref.component.html',
  styleUrls: ['./dialog-ref.component.scss']
})
export class DialogRefComponent implements OnInit {


  //Controle preenchimento do campos do nome do arquivo.
  public excelForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private gerarExcelService: ExportExcelService,
  private produtosService: ProdutoService,
  public dialogRef: MatDialogRef<DialogRefComponent>, @Inject(MAT_DIALOG_DATA)
  public data: {produtosArray: MatTableDataSource<Produtos>}) {}


  ngOnInit(): void {
    this.excelForm = this.fb.group({
      caminhoArquivo: ['', Validators.required],
    });
  }


  fecharDialog(){
    this.dialogRef.close();
  }

  caminhoArquivo: string;

  selecaoRadions = {descricao: false, estoque: false}
  selecaoCheckOpcaoExportar = {pdf: false, excel: false}


  selecaoRadionsExportar = { opcao: 'todos' }; // "todos" é a opção padrão

  opcoesRadios = [  { value: 'descricao', label: 'Descrição' },  { value: 'estoque', label: 'Estoque' },  { value: 'todos', label: 'Todos' }];


  //Desabilitar campos para exportação
  camposHabilitados:Boolean = false;


  

  gerarExcel() {

    if(this.excelForm.valid){
      if (this.caminhoArquivo) {
        let camposSelecionados = [];
        switch(this.selecaoRadionsExportar.opcao) {
          case "descricao":
            camposSelecionados.push("descricao");
            break;
          case "estoque":
            camposSelecionados.push("estoque");
            break;
          case "todos":
            camposSelecionados = ["descricao", "estoque"];
            break;
        }
  
      //Caso a exportação for para PDF  
      if(this.selecaoCheckOpcaoExportar.pdf){
  
        let dataParaPdf = this.data.produtosArray.data.map(produto => {
          let produtoSelecionado = {};
          camposSelecionados.forEach(campo => {
            produtoSelecionado[campo] = produto[campo];
          });
          return produtoSelecionado;
        });
  
        // Atualiza o objeto GeneratPdfRequest para incluir a tabela de dados
        let generatePdfRequest = new GeneratePdflRequest();
        generatePdfRequest.fileName = this.caminhoArquivo
        generatePdfRequest.tableData = dataParaPdf.map(produto => Object.values(produto))
        generatePdfRequest.titulo = "Matérias Primas"
        generatePdfRequest.criador = "Sistema Interno Pizzaria Roma"
        generatePdfRequest.ColumnNames = camposSelecionados
  
         
  
        // Debug: verifica se os dados para Excel contêm os valores esperados
        console.log('Dados para Pdf:', dataParaPdf);
  
        // Chama o método gerarExcel() no serviço ExportExcelService com o objeto GenerateExcelRequest atualizado
        this.gerarExcelService.gerarPdf(generatePdfRequest).subscribe(
          (response: any) => {
            // Cria um link de download para o arquivo PDF gerado
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = generatePdfRequest.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
          error => console.log(error)
        );
      }else{
        let dataParaExcel = this.data.produtosArray.data.map(produto => {
          let produtoSelecionado = {};
          camposSelecionados.forEach(campo => {
            produtoSelecionado[campo] = produto[campo];
          });
          return produtoSelecionado;
        });
  
        //Adiciona os cabeçalhos das colunas à primeira linha do array de dados
        let cabecalhos = camposSelecionados.map(campo => campo[0].toUpperCase() + campo.slice(1));
        dataParaExcel.unshift(cabecalhos);
        
        // Atualiza o objeto GenerateExcelRequest para incluir a tabela de dados
        let generateExcelRequest = new GenerateExcelRequest();
        generateExcelRequest.fileName = this.caminhoArquivo;
        generateExcelRequest.tableData = dataParaExcel.map(produto => Object.values(produto));
        
  
        // Debug: verifica se os dados para Excel contêm os valores esperados
        console.log('Dados para Excel:', dataParaExcel);
  
  
        // Chama o método gerarExcel() no serviço ExportExcelService com o objeto GenerateExcelRequest atualizado
        this.gerarExcelService.gerarExcel(generateExcelRequest).subscribe(
          (response: any) => {
            // Cria um link de download para o arquivo Excel gerado
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = generateExcelRequest.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
          error => console.log(error)
        );
      }
    }
    }else{
      //Exibir msg de erro
      this.produtosService.construirMessage("Obrigatório preenchimento nome do arquivo que deseja exportar")
    }

  }
      
     

  HabilitarCampos(checkSelecionada: boolean, opcao: string) {

    //Verificação pra escolher somente um tipo de arquivo
    if(opcao === 'pdf' && checkSelecionada){
      this.selecaoCheckOpcaoExportar.excel = false;
    }else if (opcao === 'excel' && checkSelecionada){
      this.selecaoCheckOpcaoExportar.pdf = false;
    }

    if (this.selecaoCheckOpcaoExportar.pdf || this.selecaoCheckOpcaoExportar.excel) {
      this.camposHabilitados = true;
    } else {
      this.camposHabilitados = false;
    }
  }

  
   
}
