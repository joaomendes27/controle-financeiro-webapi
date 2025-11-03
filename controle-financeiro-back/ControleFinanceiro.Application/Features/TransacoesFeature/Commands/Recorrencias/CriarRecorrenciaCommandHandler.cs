using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Commands.Recorrencias;

public class CriarRecorrenciaCommandHandler
{
    private readonly IRecorrenciaTransacaoRepository _repo;
    private readonly IHttpContextAccessor _http;

    public CriarRecorrenciaCommandHandler(IRecorrenciaTransacaoRepository repo, IHttpContextAccessor http)
    {
        _repo = repo;
        _http = http;
    }

    public async Task<int> Handle(CriarRecorrenciaCommand cmd)
    {
        var userId = int.Parse(_http.HttpContext!.User.FindFirst("id")!.Value);

        var item = new RecorrenciaTransacao
        {
            Descricao = cmd.Descricao?.Trim() ?? string.Empty,
            Valor = cmd.Valor,
            DiaDoMes = cmd.DiaDoMes,
            CategoriaId = cmd.CategoriaId,
            UsuarioId = userId,
            Ativo = true
        };
        await _repo.AdicionarAsync(item);
        return item.Id;
    }
}
