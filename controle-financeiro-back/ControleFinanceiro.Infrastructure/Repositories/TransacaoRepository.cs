using ControleFinanceiro.Infrastructure.Data;
using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using ControleFinanceiro.Domain.Enums;

namespace ControleFinanceiro.Infrastructure.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly AppDbContext _context;

        public TransacaoRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Transacao?> BuscarPorIdAsync(int id)
        {
            return await _context.Transacoes.FindAsync(id);
        }

        public async Task AdicionarAsync(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
        }
        public async Task AtualizarAsync(Transacao transacao)
        {
            _context.Transacoes.Update(transacao);
            await _context.SaveChangesAsync();
        }
        public async Task RemoverAsync(int id)
        {
            var transacao = await BuscarPorIdAsync(id);
            if (transacao is not null)
                _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Transacao>> ListarDoUsuarioAsync(int usuarioId, TipoCategoriaEnum? tipo)
        {
            var query = _context.Transacoes.Include(t => t.Categoria).Where(t => t.UsuarioId == usuarioId);

            if (tipo.HasValue)
                query = query.Where(t => t.Categoria.Tipo == tipo);

            return await query.ToListAsync();
        }

        public async Task<List<Transacao>> FiltrarMesAnoAsync(int usuarioId, int mes, int ano)
        {
            return await _context.Transacoes.Include(t => t.Categoria).Where(t => t.UsuarioId == usuarioId && t.DataTransacao.Month == mes && t.DataTransacao.Year == ano)
                .ToListAsync();
        }
    }

}
