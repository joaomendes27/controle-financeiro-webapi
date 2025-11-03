using ControleFinanceiro.Application.Features.TransacoesFeature.Commands.Recorrencias;
using ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecorrenciasController : ControllerBase
{
    private readonly CriarRecorrenciaCommandHandler _criar;
    private readonly IRecorrenciaTransacaoRepository _repo;

    public RecorrenciasController(CriarRecorrenciaCommandHandler criar, IRecorrenciaTransacaoRepository repo)
    {
        _criar = criar;
        _repo = repo;
    }

    [HttpPost]
    public async Task<ActionResult<object>> Criar([FromBody] CriarRecorrenciaCommand cmd)
    {
        var id = await _criar.Handle(cmd);
        return Ok(new { id });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecorrenciaResponseDTO>>> Listar()
    {
        var userId = int.Parse(User.FindFirst("id")!.Value);
        var itens = await _repo.ListarTodasDoUsuarioAsync(userId);
        var dtos = itens.Select(i => new RecorrenciaResponseDTO
        {
            Id = i.Id,
            Descricao = i.Descricao,
            Valor = i.Valor,
            DiaDoMes = i.DiaDoMes,
            CategoriaId = i.CategoriaId,
            Ativo = i.Ativo,
            UltimaGeracao = i.UltimaGeracao
        });
        return Ok(dtos);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var userId = int.Parse(User.FindFirst("id")!.Value);
        await _repo.RemoverAsync(id, userId);
        return NoContent();
    }
}
