using Dapper;
using pizzaria.api01.Interface;
using System.Data;
using pizzaria.api01.Model;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Data.SqlClient;
using static Dapper.SqlMapper;
using System.Drawing;
using System.Reflection.Metadata;

namespace pizzaria.api01.Repositorio
{
    public  abstract class RepositorioBaseMateriaPrima<MateriaPrimas> : IMateriaPrima<MateriaPrimas>
    {
        protected readonly IDbConnection _dbConnection;
        protected readonly FiltroMateriaPrimaRepository _filtroMateriaPrima;

        public RepositorioBaseMateriaPrima(IDbConnection dbConnection, FiltroMateriaPrimaRepository filtroMateriaPrima)
        {
            _dbConnection = dbConnection;
            _filtroMateriaPrima = filtroMateriaPrima;
        }

        public virtual async Task<IEnumerable<MateriaPrimas>> ListarMateriaPrima()
        {
            return await _dbConnection.QueryAsync<MateriaPrimas>($"SELECT * FROM {typeof(MateriaPrimas).Name}");
        }

        //public virtual async Task<IEnumerable<MateriaPrimas>> ListarMateriaPrima(FiltroMateriaPrima filtro)
        //{
        //    var filtroMateriaPrima = _filtroMateriaPrima.FiltrarMateriaPrimas(filtro);

        //    if (filtroMateriaPrima != null)
        //    {
        //        var parametros = new DynamicParameters();
        //        parametros.Add("@materia_filtro", $"{filtro.Valor}", DbType.String);

        //        var command = $"SELECT Id, Descricao, Estoque FROM MateriaPrimas {filtroMateriaPrima}";

        //        return await _dbConnection.QueryAsync<MateriaPrimas>(command, parametros);
        //    }

        //    var commandsemwhere = $"SELEC Id, Descricao, Estoque FROM {typeof(MateriaPrimas).Name}";

        //    return await _dbConnection.QueryAsync<MateriaPrimas>(commandsemwhere);







        //}



        public virtual async Task<MateriaPrimas> GetByIdMateriaPrima(int id)
        {
            return await _dbConnection.QueryFirstOrDefaultAsync<MateriaPrimas>($"SELECT * FROM {typeof(MateriaPrimas).Name} WHERE Id = @id", new { id });
        }
        public virtual async Task<int> InserirMateriaPrima(MateriaPrimas materiaPrima)
        {
            var query = $"INSERT INTO {typeof(MateriaPrimas).Name} (Descricao, Estoque) VALUES (@Descricao, @Estoque); SELECT SCOPE_IDENTITY();";
            return await _dbConnection.ExecuteScalarAsync<int>(query, materiaPrima);
        }
        public virtual async Task<bool> AlterarMateriaPrima(MateriaPrimas materiaPrima)
        {
            var query = $"UPDATE {typeof(MateriaPrimas).Name} SET Descricao = @Descricao, Estoque = @Estoque WHERE Id = @Id";
            var result = await _dbConnection.ExecuteAsync(query, materiaPrima);
            return result > 0;
        }
        public virtual async Task<bool> ExcluirMateriaPrima(int id)
        {
            var query = $"DELETE FROM {typeof(MateriaPrimas).Name} WHERE Id = @id";
            var result = await _dbConnection.ExecuteAsync(query, new { id });
            return result > 0;
        }

    }
}
