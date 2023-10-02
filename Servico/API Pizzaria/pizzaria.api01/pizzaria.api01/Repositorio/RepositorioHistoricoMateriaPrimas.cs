using Aspose.Pdf;
using Dapper;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace pizzaria.api01.Repositorio
{
    public abstract class RepositorioBaseHistoricoMateriaPrima<HistoricoMateriaPrima> : IHistoricoMateriaPrima<HistoricoMateriaPrima>
    {
        protected readonly IDbConnection _dbConnection;

        public RepositorioBaseHistoricoMateriaPrima(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }


        public virtual async Task<IEnumerable<HistoricoMateriaPrima>> ListarHistorico()
        {
            return await _dbConnection.QueryAsync<HistoricoMateriaPrima>($"SELECT * FROM {typeof(HistoricoMateriaPrima).Name}");
        }

        public virtual async Task<HistoricoMateriaPrima> GetByIdHistorico(int id)
        {
            return await _dbConnection.QueryFirstOrDefaultAsync<HistoricoMateriaPrima>($"SELECT * FROM {typeof(HistoricoMateriaPrima).Name} WHERE HistoricoID = @id", new { id });
        }

        public virtual async Task<int> InserirHistorico(HistoricoMateriaPrima usuarios)
        {
            var query = $"INSERT INTO {typeof(HistoricoMateriaPrima).Name} (MateriaPrimaID, DataHistorico, Descricao) VALUES (@MateriaPrimaID, @DataHistorico, @Descricao); SELECT SCOPE_IDENTITY();";
            return await _dbConnection.ExecuteScalarAsync<int>(query, usuarios);
        }

        public virtual async Task<bool> ExcluirHistorico(int id)
        {
            var query = $"DELETE FROM {typeof(HistoricoMateriaPrima).Name} WHERE HistoricoID = @id";
            var result = await _dbConnection.ExecuteAsync(query, new { id });
            return result > 0;
        }

    }
}
