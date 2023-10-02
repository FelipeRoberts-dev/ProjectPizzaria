using pizzaria.api01.Model;
using System.Data;

namespace pizzaria.api01.Repositorio
{
    public class HistoricoMateriaPrimaRepositorio : RepositorioBaseHistoricoMateriaPrima<HistoricoMateriaPrima>
    {
        public HistoricoMateriaPrimaRepositorio(IDbConnection dbConnection) : base(dbConnection)
        {

        }

    }
}
