using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using pizzaria.api01.Repositorio;
using System.Data;
using Microsoft.Extensions.Logging;
namespace pizzaria.api01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutos<Produtos> _produtosRepositorio;
        private readonly IMateriaPrima<MateriaPrimas> _materiaPrimaRepositorio;
        private readonly ILogger<ProdutosController> _logger;

        public ProdutosController(IDbConnection dbConnection, ILogger<ProdutosController> logger)
        { 
            _produtosRepositorio = new ProdutosRepositorio(dbConnection);
            _materiaPrimaRepositorio = new MateriaPrimaRepositorio(dbConnection);
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            
            var produto = await _produtosRepositorio.GetByIdProdutos(id);
            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        [HttpGet("Listar")]
        public async Task<IActionResult> ListarProdutos()
        {
            var produtos = await _produtosRepositorio.ListarProdutos();
            return Ok(produtos);
        }

        [HttpPost("Incluir")]
        public async Task<IActionResult> IncluirProdutos([FromBody] Produtos produto)
        {
            _logger.LogInformation("Iniciando inserção do produto...");
            var id = await _produtosRepositorio.InserirProdutos(produto);
            produto.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
        }

        [HttpPut("Alterar/{id}")]
        public async Task<IActionResult> AlterarProdutos(int id, [FromBody] Produtos produtos)
        {
            if (id != produtos.Id)
                return BadRequest();

            var result = await _produtosRepositorio.AlterarProdutos(produtos);
            if (!result)
                return NotFound();

            return NoContent();
        }


        [HttpDelete("Excluir/{id}")]
        public async Task<IActionResult> ExcluirProdutos(int id)
        {
            var result = await _produtosRepositorio.ExcluirProdutos(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("ListarMateriaPrima")]
        public async Task<IActionResult> ListarMateriaPrimas()
        {
            var materiaPrimas = await _materiaPrimaRepositorio.ListarMateriaPrima();
            return Ok(materiaPrimas);
        }
    }
}
