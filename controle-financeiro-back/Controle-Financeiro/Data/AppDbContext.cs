using Controle_Financeiro.Models;
using Controle_Financeiro.Models.Enums;
using Microsoft.EntityFrameworkCore;
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nome = "Salário", Tipo = TipoCategoria.Receita },
                new Categoria { Id = 2, Nome = "Alimentação", Tipo = TipoCategoria.Despesa }
            );
        }

    }
}
