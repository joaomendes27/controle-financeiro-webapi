namespace ControleFinanceiro.Application.Features.TransacoesFeature.Services;

public interface IRecorrenciaService
{
    Task ProcessarPendentesNoMesAsync(int usuarioId, DateTime agoraLocal);
}
