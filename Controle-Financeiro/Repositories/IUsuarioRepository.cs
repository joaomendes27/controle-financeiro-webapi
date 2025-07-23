using Controle_Financeiro.Models;

namespace Controle_Financeiro.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> BuscarPorEmailAsync(string email);
        Task<Usuario?> BuscarPorNomeAsync(string nome);
        Task CadastrarAsync(Usuario usuario);


    }
}
