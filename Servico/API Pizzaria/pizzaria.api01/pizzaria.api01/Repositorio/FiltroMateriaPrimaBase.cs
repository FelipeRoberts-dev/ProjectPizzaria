using pizzaria.api01.Model;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using pizzaria.api01.Interface;
using System.Data.Common;
using Newtonsoft.Json.Schema;

namespace pizzaria.api01.Repositorio
{
    public class FiltroMateriaPrimaRepository : IFiltroMateriaPrima
    {
        private readonly IDbConnection _dbConnection;

        public FiltroMateriaPrimaRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public string FiltrarMateriaPrimas(FiltroMateriaPrima filtro)
        {
            var str = $"SELECT Id, Descricao, Estoque FROM {filtro.Tabela}";
            var parametros = new List<SqlParameter>();
            string whereClause = "";
            string wheresemClause = "";

           if(filtro.Valor_LIKE == null && filtro.Valor_IGUAL == null)
            {
                return wheresemClause;
            }


            AdicionarParametro(filtro, parametros);

            AdicionarCondicao(filtro, ref str, parametros);

            whereClause = " WHERE " + filtro.Condicao;

            return whereClause;

        }

        private static void AdicionarParametro(FiltroMateriaPrima filtro, List<SqlParameter> parametros)
        {
            parametros.Add(new SqlParameter($"@{filtro.Valor}_filtro", filtro.Valor));
            parametros.Add(new SqlParameter($"@{filtro.Valor_LIKE}_filtro", filtro.Valor_LIKE));
            parametros.Add(new SqlParameter($"@{filtro.Valor_IGUAL}_filtro", filtro.Valor_IGUAL));

        }

        private static void AdicionarCondicao(FiltroMateriaPrima filtro, ref string str, List<SqlParameter> parametros)
        {
            if (!string.IsNullOrEmpty(filtro.Criterio_LIKE) || !string.IsNullOrEmpty(filtro.Criterio_IGUAL)
                || !string.IsNullOrEmpty(filtro.Criterio_MAIORIGUAL) || !string.IsNullOrEmpty(filtro.Criterio_MENOIGUAL))


            {
                if (filtro.Criterio_IGUAL == "=")
                {
                    filtro.Condicao = $"Estoque = @{filtro.Valor_IGUAL}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor_IGUAL}", filtro.Valor_IGUAL));
                }
                else if (filtro.Criterio_LIKE == "LIKE")
                {
                    filtro.Condicao = $"Descricao LIKE '%' + @{filtro.Valor_LIKE}_filtro + '%'";
                    parametros.Add(new SqlParameter($"@{filtro.Valor_LIKE}", filtro.Valor_LIKE));
                }
                else if (filtro.Criterio_MAIOR == ">")
                {
                    filtro.Condicao = $"{filtro.Campo} > @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio_MENOR == "<")
                {
                    filtro.Condicao = $"{filtro.Campo} < @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio_MAIORIGUAL == ">=")
                {
                    filtro.Condicao = $"{filtro.Campo} >= @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio_MENOIGUAL == "<=")
                {
                    filtro.Condicao = $"{filtro.Campo} <= @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }

                if (!string.IsNullOrEmpty(filtro.Condicao))
                {
                    if (filtro.AndCondicao)
                    {
                        str += " AND ";
                    }
                    else if (!filtro.Condicao.Contains("WHERE"))
                    {
                        str += " WHERE ";
                    }

                    str += filtro.Condicao;

                    filtro.AndCondicao = true;

               

                }

                
            }
        }

    }
}


