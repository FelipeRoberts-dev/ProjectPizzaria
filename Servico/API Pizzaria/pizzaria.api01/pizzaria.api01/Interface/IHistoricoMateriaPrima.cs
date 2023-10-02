using pizzaria.api01.Model;

namespace pizzaria.api01.Interface
{
    public interface IHistoricoMateriaPrima<HistoricoMateriaPrima>
    {
        Task<IEnumerable<HistoricoMateriaPrima>> ListarHistorico();
        Task<HistoricoMateriaPrima> GetByIdHistorico(int id);
        Task<int> InserirHistorico(HistoricoMateriaPrima usuarios);
        //Task<bool> AlterarHistorico(HistoricoMateriaPrima usuarios);
        Task<bool> ExcluirHistorico(int id);
    }
}
