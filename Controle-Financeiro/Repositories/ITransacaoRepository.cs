using Controle_Financeiro.Models;

namespace Controle_Financeiro.Repositories
{
    public interface ITransacaoRepository
    {
        Task<Transacao?> BuscarPorIdAsync(int id);
        Task AdicionarAsync(Transacao transacao);
        Task AtualizarAsync(Transacao transacao);
        Task RemoverAsync(int id);
    }
}
