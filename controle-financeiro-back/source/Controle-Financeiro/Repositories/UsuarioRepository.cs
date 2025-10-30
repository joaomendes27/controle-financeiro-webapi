using Controle_Financeiro.Data;
using Controle_Financeiro.Models;
using Microsoft.EntityFrameworkCore;

namespace Controle_Financeiro.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<Usuario?> BuscarPorEmailAsync(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Usuario?> BuscarPorNomeAsync(string nome)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Nome == nome);
        }

        public async Task CadastrarAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
    }
}
