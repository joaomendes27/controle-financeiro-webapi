using ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;
using ControleFinanceiro.Domain.Enums;
using ControleFinanceiro.Domain.Interfaces;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ComparativoMesAnterior;

public class ComparativoMesAnteriorQueryHandler
{
    private readonly ITransacaoRepository _repo;

    public ComparativoMesAnteriorQueryHandler(ITransacaoRepository repo)
    {
        _repo = repo;
    }

    public async Task<ComparativoMesAnteriorResponseDTO> Handle(ComparativoMesAnteriorQuery query)
    {
        var dia = Math.Max(1, query.Dia);
        var mes = Math.Max(1, query.Mes);
        var ano = query.Ano;

        var atualInicio = new DateTime(ano, mes, 1);
        var atualFim = new DateTime(ano, mes, Math.Min(dia, DateTime.DaysInMonth(ano, mes)));

        var mesAnteriorData = atualInicio.AddMonths(-1);
        var anteriorInicio = new DateTime(mesAnteriorData.Year, mesAnteriorData.Month, 1);
        var anteriorFim = new DateTime(
        mesAnteriorData.Year,
        mesAnteriorData.Month,
        Math.Min(dia, DateTime.DaysInMonth(mesAnteriorData.Year, mesAnteriorData.Month)));

        var transacoesAnterior = await _repo.ListarPorPeriodoDoUsuarioAsync(query.UsuarioId, anteriorInicio, anteriorFim);

        var totalReceitas = transacoesAnterior.Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Receita).Sum(t => t.Valor);
        var totalDespesas = transacoesAnterior.Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Despesa).Sum(t => t.Valor);

        return new ComparativoMesAnteriorResponseDTO
        {
            TotalReceitas = totalReceitas,
            TotalDespesas = totalDespesas
        };
    }
}
