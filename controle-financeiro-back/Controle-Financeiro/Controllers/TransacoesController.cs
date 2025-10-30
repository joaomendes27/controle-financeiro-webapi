using ControleFinanceiro.Application.Features.TransacoesFeature.Commands.AdicionarTransacao;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ListarTransacoesDoUsuario;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.FiltrarTransacoesMesAno;
using ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;
using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Domain.Enums; 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoCommandHandler _commandHandler;
        private readonly ListarTransacoesDoUsuarioQueryHandler _listarQueryHandler;
        private readonly FiltrarTransacoesMesAnoQueryHandler _filtrarQueryHandler;

        public TransacoesController(
            TransacaoCommandHandler commandHandler,
            ListarTransacoesDoUsuarioQueryHandler listarQueryHandler,
            FiltrarTransacoesMesAnoQueryHandler filtrarQueryHandler)
        {
            _commandHandler = commandHandler;
            _listarQueryHandler = listarQueryHandler;
            _filtrarQueryHandler = filtrarQueryHandler;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransacaoCommand command)
        {
            await _commandHandler.Handle(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("usuario")]
        public async Task<ActionResult<List<TransacoesResponseDTO>>> GetDoUsuario([FromQuery] TipoCategoriaEnum? tipo)
        {
            var usuarioId = int.Parse(User.FindFirst("id").Value);
            var query = new ListarTransacoesDoUsuarioQuery
            {
                UsuarioId = usuarioId,
                Tipo = tipo
            };
            var resultado = await _listarQueryHandler.Handle(query);
            return Ok(resultado);
        }

        [Authorize]
        [HttpGet("relatorio")]
        public async Task<ActionResult<PdfMensalDTO>> GetRelatorioMensal(int mes, int ano)
        {
            var usuarioId = int.Parse(User.FindFirst("id").Value);
            var query = new FiltrarTransacoesMesAnoQuery
            {
                UsuarioId = usuarioId,
                Mes = mes,
                Ano = ano
            };
            var relatorio = await _filtrarQueryHandler.Handle(query);
            return Ok(relatorio);
        }
    }
}
