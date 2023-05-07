using iTextSharp.text;
using iTextSharp.text.pdf;

public class HeaderFooter : PdfPageEventHelper
{
    private string cabecalho;

    public HeaderFooter(string cabecalho)
    {
        this.cabecalho = cabecalho;
    }

    public override void OnEndPage(PdfWriter writer, Document document)
    {
        PdfPTable table = new PdfPTable(1);
        table.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
        PdfPCell cell = new PdfPCell(new Phrase(cabecalho));
        cell.Border = 0;
        cell.HorizontalAlignment = Element.ALIGN_CENTER;
        table.AddCell(cell);
        table.WriteSelectedRows(0, -1, document.LeftMargin, document.PageSize.Height - document.TopMargin + table.TotalHeight + 10, writer.DirectContent);
    }
}
