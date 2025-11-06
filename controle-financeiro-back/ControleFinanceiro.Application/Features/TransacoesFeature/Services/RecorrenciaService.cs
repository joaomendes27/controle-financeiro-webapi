using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Services;

public class RecorrenciaService : IRecorrenciaService
{
    private readonly IRecorrenciaTransacaoRepository _recorrenciaRepo;
    private readonly ITransacaoRepository _transacaoRepo;

    public RecorrenciaService(IRecorrenciaTransacaoRepository recorrenciaRepo, ITransacaoRepository transacaoRepo)
    {
        _recorrenciaRepo = recorrenciaRepo;
        _transacaoRepo = transacaoRepo;
    }

    public async Task ProcessarPendentesNoMesAsync(int usuarioId, DateTime agoraLocal)
    {
        var ano = agoraLocal.Year;
        var mes = agoraLocal.Month;
        var recorrencias = await _recorrenciaRepo.ListarAtivasAsync(usuarioId);
        foreach (var r in recorrencias)
        {
            if (!r.Ativo) continue;

            var ultimoDia = DateTime.DaysInMonth(ano, mes);
            var dia = Math.Clamp(r.DiaDoMes, 1, ultimoDia);
            var dataAgendada = new DateTime(ano, mes, dia, 0, 0, 0, DateTimeKind.Local);
            var jaProcessadoEsteMes = r.UltimaGeracao.HasValue && r.UltimaGeracao.Value.Year == ano && r.UltimaGeracao.Value.Month == mes;
            if (agoraLocal >= dataAgendada && !jaProcessadoEsteMes)
            {
                var valor = r.Valor;
                if (r.CategoriaId == 1) valor = Math.Abs(valor);
                if (r.CategoriaId == 2) valor = -Math.Abs(valor);
                var transacao = new Transacao
                {
                    Valor = valor,
                    Descricao = r.Descricao,
                    DataTransacao = dataAgendada,
                    CategoriaId = r.CategoriaId,
                    UsuarioId = r.UsuarioId
                };
                await _transacaoRepo.AdicionarAsync(transacao);
                r.UltimaGeracao = dataAgendada;
                await _recorrenciaRepo.AtualizarAsync(r);
            }
        }
    }
}
