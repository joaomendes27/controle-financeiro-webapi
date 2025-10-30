using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> BuscarPorEmailAsync(string email);
        Task<Usuario?> BuscarPorNomeAsync(string nome);
        Task CadastrarAsync(Usuario usuario);


    }
}
