namespace pizzaria.api01.Model
{
    public class FiltroMateriaPrima
    
    {
        public string? Tabela { get; set; }
        public string? Campo { get; set; }
        public string? Criterio { get; set; }
        public string? Valor { get; set; }
        public string? Condicao { get; set; }
        public string? TipoVariavel { get; set; }

        public bool AndCondicao { get; set; }
    }
}
