using Controle_Financeiro.Data;
using Controle_Financeiro.Models;

namespace Controle_Financeiro.Repositories
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
    }

}
