using Dapper;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using System.Data;

namespace pizzaria.api01.Repositorio
{
    public abstract class RepositorioBaseProdutos <Produtos> : IProdutos<Produtos>
    {
        protected readonly IDbConnection _dbConnection;

        public RepositorioBaseProdutos(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public virtual async Task<IEnumerable<Produtos>> ListarProdutos()
        {
            var query = $@"SELECT 
            p.Id,
            p.Codigo, 
            p.Descricao
       FROM 
            {typeof(Produtos).Name} p";

            var produtos = await _dbConnection.QueryAsync<Produtos>(query);
            return produtos;
        }

        public virtual async Task<Produtos> GetByIdProdutos(int id)
        {
            return await _dbConnection.QueryFirstOrDefaultAsync<Produtos>($"SELECT * FROM {typeof(Produtos).Name} WHERE Id = @id", new { id });
        }
        public virtual async Task<int> InserirProdutos(Produtos produtos)
        {
            var query = $"INSERT INTO {typeof(Produtos).Name} (Codigo, Descricao, MateriaPrimaId, Quantidade) VALUES (@Codigo, @Descricao, @MateriaPrimaId, @Quantidade); SELECT SCOPE_IDENTITY();";
            return await _dbConnection.ExecuteScalarAsync<int>(query, produtos);
        }
        public virtual async Task<bool> AlterarProdutos(Produtos produtos)
        {
            var query = $"UPDATE {typeof(Produtos).Name} SET Codigo = @Codigo, Descricao = @Descricao, Quantidade = @Quantidade WHERE Id = @Id";
            var result = await _dbConnection.ExecuteAsync(query, produtos);
            return result > 0;
        }
        public virtual async Task<bool> ExcluirProdutos(int id)
        {
            var query = $"DELETE FROM {typeof(Produtos).Name} WHERE Id = @id";
            var result = await _dbConnection.ExecuteAsync(query, new { id });
            return result > 0;
        }

        

    }
}
