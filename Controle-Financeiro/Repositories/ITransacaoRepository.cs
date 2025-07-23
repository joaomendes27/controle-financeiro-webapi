using Controle_Financeiro.Models;
using Controle_Financeiro.Models.Enums;

namespace Controle_Financeiro.Repositories
{
    public interface ITransacaoRepository
    {
        Task<Transacao?> BuscarPorIdAsync(int id);
        Task AdicionarAsync(Transacao transacao);
        Task AtualizarAsync(Transacao transacao);
        Task RemoverAsync(int id);
        Task<List<Transacao>> ListarDoUsuarioAsync(int usuarioId, TipoCategoria? tipo);

    }
}
