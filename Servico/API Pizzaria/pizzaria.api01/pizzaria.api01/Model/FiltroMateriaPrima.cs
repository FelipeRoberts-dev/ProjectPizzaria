namespace pizzaria.api01.Model
{
    public class FiltroMateriaPrima
    
    {
        public string? Tabela { get; set; }
        public string? Campo { get; set; }
        public string? Criterio_LIKE { get; set; }
        public string? Criterio_IGUAL { get; set; }
        public string? Criterio_MAIORIGUAL { get; set; }
        public string? Criterio_MENOIGUAL { get; set; }
        public string? Criterio_MENOR { get; set; }
        public string? Criterio_MAIOR { get; set; }
        public string? Valor { get; set; }

        public string? Valor_LIKE { get; set; }
        public string? Valor_IGUAL { get; set; }

        public string? Condicao { get; set; }
        public string? TipoVariavel { get; set; }

        public bool AndCondicao { get; set; }
    }
}
