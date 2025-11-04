using ControleFinanceiro.Application.Features.TransacoesFeature.Commands.AdicionarTransacao;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ListarTransacoesDoUsuario;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.FiltrarTransacoesMesAno;
using ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;
using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Domain.Enums; 
using ControleFinanceiro.Domain.Interfaces;
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
        private readonly ITransacaoRepository _repository;

        public TransacoesController(
            TransacaoCommandHandler commandHandler,
            ListarTransacoesDoUsuarioQueryHandler listarQueryHandler,
            FiltrarTransacoesMesAnoQueryHandler filtrarQueryHandler,
            ITransacaoRepository repository)
        {
            _commandHandler = commandHandler;
            _listarQueryHandler = listarQueryHandler;
            _filtrarQueryHandler = filtrarQueryHandler;
            _repository = repository;
        }

        [Authorize]
        [HttpPost("adicionar")]
        public async Task<IActionResult> AdicionarTransacao([FromBody] TransacaoCommand command)
        {
            await _commandHandler.Handle(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("listarPorUsuario")]
        public async Task<ActionResult<List<TransacoesResponseDTO>>> ListarPorUsuario([FromQuery] int usuarioId)
        {
            var query = new ListarTransacoesDoUsuarioQuery
            {
                UsuarioId = usuarioId,
                Tipo = null 
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

        [Authorize]
        [HttpGet("filtrarTransacoesPorMesAno")]
        public async Task<ActionResult<List<TransacoesResponseDTO>>> FiltrarTransacoesPorMesAno(
            [FromQuery] int usuarioId,
            [FromQuery] int mes,
            [FromQuery] int ano)
        {
            var transacoes = await _repository.FiltrarMesAnoAsync(usuarioId, mes, ano);

            var resultado = transacoes.Select(t => new TransacoesResponseDTO
            {
                Id = t.Id,
                Valor = t.Valor,
                Descricao = t.Descricao,
                Data = t.DataTransacao,
                CategoriaId = t.Categoria.Id
            }).ToList();

            return Ok(resultado);
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> RemoverTransacao(int id)
        {
            var usuarioId = int.Parse(User.FindFirst("id")!.Value);
            var ok = await _repository.RemoverDoUsuarioAsync(id, usuarioId);
            if (!ok) return NotFound();
            return Ok(new { message = "Transação excluída com sucesso.", id });
        }
    }
}
