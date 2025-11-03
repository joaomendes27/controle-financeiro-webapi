using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;
using ControleFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.Infrastructure.Repositories;

public class RecorrenciaTransacaoRepository : IRecorrenciaTransacaoRepository
{
    private readonly AppDbContext _context;
    public RecorrenciaTransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<RecorrenciaTransacao?> BuscarPorIdAsync(int id)
    => await _context.Recorrencias.Include(r => r.Categoria).FirstOrDefaultAsync(r => r.Id == id);

    public async Task AdicionarAsync(RecorrenciaTransacao recorrencia)
    {
        _context.Recorrencias.Add(recorrencia);
        await _context.SaveChangesAsync();
    }

    public async Task AtualizarAsync(RecorrenciaTransacao recorrencia)
    {
        _context.Recorrencias.Update(recorrencia);
        await _context.SaveChangesAsync();
    }

    public async Task<List<RecorrenciaTransacao>> ListarAtivasAsync(int usuarioId)
    => await _context.Recorrencias.Where(r => r.UsuarioId == usuarioId && r.Ativo).Include(r => r.Categoria).ToListAsync();

    public async Task<List<RecorrenciaTransacao>> ListarAtivasAsync()
    => await _context.Recorrencias.Where(r => r.Ativo).Include(r => r.Categoria).ToListAsync();

    public async Task<List<RecorrenciaTransacao>> ListarTodasDoUsuarioAsync(int usuarioId)
    => await _context.Recorrencias.Where(r => r.UsuarioId == usuarioId).Include(r => r.Categoria).ToListAsync();

    public async Task RemoverAsync(int id, int usuarioId)
    {
        var item = await _context.Recorrencias.FirstOrDefaultAsync(r => r.Id == id && r.UsuarioId == usuarioId);
        if (item != null)
        {
            _context.Recorrencias.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}
