using Controle_Financeiro.DTOs;
using Controle_Financeiro.Models.Enums;
using Controle_Financeiro.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : Controller
    {

        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] TransacaoDTO dto)
        {
            await _service.AdicionarAsync(dto);
            return Ok();
        }

        [Authorize]
        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int id, [FromForm] TransacaoDTO dto)
        {
            await _service.AtualizarAsync(id, dto);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.RemoverAsync(id);
            return Ok();
        }

        [Authorize]
        [HttpGet("usuario")]
        public async Task<ActionResult<List<TransacaoRespostaDTO>>> GetDoUsuario([FromQuery] TipoCategoria? tipo)
        {
            var usuarioId = int.Parse(User.FindFirst("id").Value);
            var resultado = await _service.ListarDoUsuarioAsync(usuarioId, tipo);
            return Ok(resultado);
        }
    }
}
