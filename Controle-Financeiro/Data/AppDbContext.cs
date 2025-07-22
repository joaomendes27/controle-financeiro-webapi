using Microsoft.EntityFrameworkCore;
using Controle_Financeiro.Models;
using Microsoft.Identity.Client;

namespace Controle_Financeiro.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; } 
        public DbSet<Transacao> Transacoes { get; set; }
        public DbSet<Categoria> Categorias {  get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    }
}
