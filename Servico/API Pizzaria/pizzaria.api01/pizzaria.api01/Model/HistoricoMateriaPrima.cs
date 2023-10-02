using Dapper.Contrib.Extensions;
using pizzaria.api01.Interface;
using System.ComponentModel.DataAnnotations.Schema;
using TableAttribute = Dapper.Contrib.Extensions.TableAttribute;

namespace pizzaria.api01.Model
{
    [Table("HistoricoMateriaPrima")]
    public class HistoricoMateriaPrima
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HistoricoID { get; set; }

        public int MateriaPrimaID { get; set; }

        public DateTime DataHistorico { get; set; } // Adicione a propriedade para a data do histórico

        public string Descricao { get; set; } // Adicione a propriedade para a descrição

    }
}
