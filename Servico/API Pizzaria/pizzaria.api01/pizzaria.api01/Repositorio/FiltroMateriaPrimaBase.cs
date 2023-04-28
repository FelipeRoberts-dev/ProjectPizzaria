using pizzaria.api01.Model;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using pizzaria.api01.Interface;
using System.Data.Common;

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

            if (!string.IsNullOrEmpty(filtro.Campo) && !string.IsNullOrEmpty(filtro.Criterio))
            {
                AdicionarParametro(filtro, parametros);
                AdicionarCondicao(filtro, ref str, parametros);
                whereClause = " WHERE "  + filtro.Condicao;
            }


            return whereClause;

        }

        private static void AdicionarParametro(FiltroMateriaPrima filtro, List<SqlParameter> parametros)
        {
            parametros.Add(new SqlParameter($"@{filtro.Valor}_filtro", filtro.Valor));

        }

        private static void AdicionarCondicao(FiltroMateriaPrima filtro, ref string str, List<SqlParameter> parametros)
        {
            if (!string.IsNullOrEmpty(filtro.Criterio))
            {
                if (filtro.Criterio == "=")
                {
                    filtro.Condicao = $"{filtro.Campo} = @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio == "LIKE")
                {
                    filtro.Condicao = $"{filtro.Campo} LIKE '%' + @{filtro.Valor}_filtro + '%'";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio == ">")
                {
                    filtro.Condicao = $"{filtro.Campo} > @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio == "<")
                {
                    filtro.Condicao = $"{filtro.Campo} < @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio == ">=")
                {
                    filtro.Condicao = $"{filtro.Campo} >= @{filtro.Valor}_filtro";
                    parametros.Add(new SqlParameter($"@{filtro.Valor}", filtro.Valor));
                }
                else if (filtro.Criterio == "<=")
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


