using Microsoft.AspNetCore.Mvc;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using pizzaria.api01.Repositorio;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pizzaria.api01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoMateriaPrimaController : ControllerBase
    {

        private readonly IHistoricoMateriaPrima<HistoricoMateriaPrima> _historicoMateriaPrimaRepositorio;


        public HistoricoMateriaPrimaController(IHistoricoMateriaPrima<HistoricoMateriaPrima> historicoMateriaPrima)
        {
            _historicoMateriaPrimaRepositorio = historicoMateriaPrima;
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var historicoMateriaPrima = await _historicoMateriaPrimaRepositorio.GetByIdHistorico(id);
            if (historicoMateriaPrima == null)
                return NotFound();

            return Ok(historicoMateriaPrima);
        }


        [HttpGet("Listar")]
        public async Task<IActionResult> ListarHistorioMateriaPrima()
        {
            var historioMateriaPrima = await _historicoMateriaPrimaRepositorio.ListarHistorico();
            return Ok(historioMateriaPrima);
        }

        [HttpPost("Incluir")]
        public async Task<IActionResult> IncluirHistoricoMateriaPrima([FromBody] HistoricoMateriaPrima historicoMateriaPrima)
        {
            var id = await _historicoMateriaPrimaRepositorio.InserirHistorico(historicoMateriaPrima);
            historicoMateriaPrima.HistoricoID = id;

            return CreatedAtAction(nameof(GetById), new { id = historicoMateriaPrima.HistoricoID }, historicoMateriaPrima);
        }

        

        [HttpDelete("Excluir/{id}")]
        public async Task<IActionResult> ExcluirHistoricoMateriaPrima(int id)
        {
            var result = await _historicoMateriaPrimaRepositorio.ExcluirHistorico(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
