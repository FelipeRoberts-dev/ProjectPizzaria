using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using iTextSharp.text;
using iTextSharp.text.pdf;


namespace MeuProjeto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelGerarController : ControllerBase
    {
        [HttpPost("gerarExcel")]
        public IActionResult GenerateExcel([FromBody] GenerateExcelRequest request)
        {
            if (request.TableData == null)
            {
                return BadRequest("A tabela não foi fornecida.");
            }

            IEnumerable<object[]> table = request.TableData;

            MemoryStream stream = ExportToExcel(table);
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var fileName = string.IsNullOrEmpty(request.FileName) ? "tabela.xlsx" : request.FileName;

            return new FileStreamResult(stream, contentType)
            {
                FileDownloadName = fileName
            };
        }

        [HttpPost("gerarPdf")]
        public IActionResult GeneratePDF([FromBody] GeneratePDFRequest request)
        {
            if (request.TableData == null)
            {
                return BadRequest("A tabela não foi fornecida.");
            }

            IEnumerable<object[]> table = request.TableData;

            MemoryStream stream = ExportToPDF(table, request.Titulo, request.Autor, request.Criador, request.ColumnNames); 
            var contentType = "application/pdf";
            var fileName = string.IsNullOrEmpty(request.FileName) ? "tabela.pdf" : request.FileName;

            return new FileStreamResult(stream, contentType)
            {
                FileDownloadName = fileName
            };
        }

        private MemoryStream ExportToExcel(IEnumerable<object[]> table)
        {
            MemoryStream stream = new MemoryStream();

            using (ExcelPackage package = new ExcelPackage())
            {
                // Cria uma nova planilha no arquivo Excel
                var worksheet = package.Workbook.Worksheets.Add("Planilha1");

                //// Cabeçalhos das colunas
                //for (int i = 0; i < table.First().Length; i++)
                //{
                //    worksheet.Cells[1, i + 1].Value = table.First()[i]?.ToString();
                //}

                // Dados da tabela
                for (int i = 1; i <= table.Count(); i++)
                {
                    var row = worksheet.Cells[i + 1, 1];

                    for (int j = 0; j < table.ElementAt(i - 1).Length; j++)
                    {
                        row.Offset(0, j).Value = table.ElementAt(i - 1)[j]?.ToString();
                    }
                }

                // Configura a largura das colunas
                worksheet.Cells.AutoFitColumns();

                // Salva o arquivo Excel no stream
                package.SaveAs(stream);
            }

            stream.Position = 0;
            return stream;
        }

        private MemoryStream ExportToPDF(IEnumerable<object[]> table, string? title, string? author, string? creator, string[] columnNames)
        {
            MemoryStream stream = new MemoryStream();

            using (Document document = new Document())
            {
                PdfWriter writer = PdfWriter.GetInstance(document, stream);
                writer.CloseStream = false;

                // Configura os metadados do documento
                if (!string.IsNullOrEmpty(title))
                {
                    document.AddTitle(title);
                }
                if (!string.IsNullOrEmpty(author))
                {
                    document.AddAuthor(author);
                }
                if (!string.IsNullOrEmpty(creator))
                {
                    document.AddCreator(creator);
                }

                ////Define o cabeçalho da tabela como uma string formatada com os nomes das colunas 
                string headerText = string.Join(" | ", columnNames ?? Array.Empty<string>());

                /// Define o evento HeaderFooter para incluir o cabeçalho em todas as páginas
                HeaderFooter eventHandler = new HeaderFooter(headerText);
                writer.PageEvent = eventHandler;

                document.Open();

                // Cria a tabela com os dados e as colunas definidas
                PdfPTable pdfTable = new PdfPTable(columnNames.Length);

                // Adiciona as colunas à tabela
                foreach (string columnName in columnNames)
                {
                    pdfTable.AddCell(columnName);
                }

                // Adiciona os dados à tabela
                foreach (object[] rowData in table)
                {
                    foreach (object dataItem in rowData)
                    {
                        pdfTable.AddCell(dataItem.ToString());
                    }
                }

                document.Add(pdfTable);


            }

            stream.Position = 0;
            return stream;
        }


    }

    public class GenerateExcelRequest
    {
        public string? FileName { get; set; }
        public IEnumerable<object[]>? TableData { get; set; }
    }

    public class GeneratePDFRequest
    {
        public string? FileName { get; set; }
        public IEnumerable<object[]>? TableData { get; set; }
        public string? Titulo { get; set; }
        public string? Autor { get; set; }
        public string? Criador { get; set; }
        public string[]? ColumnNames { get; set; }
    }

}
