using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Domain.Interfaces;

public interface IRecorrenciaTransacaoRepository
{
    Task<RecorrenciaTransacao?> BuscarPorIdAsync(int id);
    Task AdicionarAsync(RecorrenciaTransacao recorrencia);
    Task AtualizarAsync(RecorrenciaTransacao recorrencia);
    Task<List<RecorrenciaTransacao>> ListarAtivasAsync(int usuarioId);
    Task<List<RecorrenciaTransacao>> ListarAtivasAsync();
    Task<List<RecorrenciaTransacao>> ListarTodasDoUsuarioAsync(int usuarioId);
    Task RemoverAsync(int id, int usuarioId);
}
