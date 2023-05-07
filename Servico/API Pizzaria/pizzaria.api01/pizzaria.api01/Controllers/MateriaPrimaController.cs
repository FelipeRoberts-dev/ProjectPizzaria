using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using pizzaria.api01.Repositorio;
using System.Data;
namespace pizzaria.api01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriaPrimaController : ControllerBase
    {
        private readonly IMateriaPrima<MateriaPrimas> _materiaPrimaRepositorio;

        public MateriaPrimaController(IMateriaPrima<MateriaPrimas> materiaPrimaRepositorio)
        {
            _materiaPrimaRepositorio = materiaPrimaRepositorio;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var materiaPrimas = await _materiaPrimaRepositorio.GetByIdMateriaPrima(id);
            if (materiaPrimas == null)
                return NotFound();

            return Ok(materiaPrimas);
        }

        [HttpGet("Listar")]
        public async Task<IActionResult> ListarMateriaPrima()
        {
            var materiaPrimas = await _materiaPrimaRepositorio.ListarMateriaPrima();
            return Ok(materiaPrimas);
        }

        [HttpGet("ListarFiltrado")]
        public async Task<IActionResult> ListarFiltrado([FromQuery] FiltroMateriaPrima filtro)
        {
            var materiaPrimas = await _materiaPrimaRepositorio.ListarMateriaPrimaFiltrada(filtro);
            return Ok(materiaPrimas);
        }

        [HttpPost("Incluir")]
        public async Task<IActionResult> IncluirMateriaPrima([FromBody] MateriaPrimas materiaPrima)
        {
            var id = await _materiaPrimaRepositorio.InserirMateriaPrima(materiaPrima);
            materiaPrima.Id = id;

            return CreatedAtAction(nameof(GetById), new { id = materiaPrima.Id }, materiaPrima);
        }

        [HttpPut("Alterar/{id}")]
        public async Task<IActionResult> AlterarMateriaPrima(int id, [FromBody] MateriaPrimas materiaPrima)
        {
            if (id != materiaPrima.Id)
                return BadRequest();

            var result = await _materiaPrimaRepositorio.AlterarMateriaPrima(materiaPrima);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("Excluir/{id}")]
        public async Task<IActionResult> ExcluirMateriaPrima(int id)
        {
            var result = await _materiaPrimaRepositorio.ExcluirMateriaPrima(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
