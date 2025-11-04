using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Enums;

namespace ControleFinanceiro.Domain.Interfaces
{
    public interface ITransacaoRepository
    {
        Task<Transacao?> BuscarPorIdAsync(int id);
        Task AdicionarAsync(Transacao transacao);
        Task AtualizarAsync(Transacao transacao);
        Task<bool> RemoverDoUsuarioAsync(int id, int usuarioId);
        Task<List<Transacao>> ListarDoUsuarioAsync(int usuarioId, TipoCategoriaEnum? tipo);
        Task<List<Transacao>> FiltrarMesAnoAsync(int usuarioId, int mes, int ano);
    }
}
