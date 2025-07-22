using Controle_Financeiro.DTOs;
using Controle_Financeiro.Models;
using Controle_Financeiro.Repositories;

namespace Controle_Financeiro.Services
{
    public class TransacaoService
    {
        private readonly ITransacaoRepository _repository;

        public TransacaoService(ITransacaoRepository repository)
        {
            _repository = repository;
        }
        public async Task<Transacao?> BuscarPorIdAsync(int id)
        {
            return await _repository.BuscarPorIdAsync(id);
        }

        public async Task AdicionarAsync(TransacaoDTO dtO)
        {
            var transacao = new Transacao
            {
                Valor = dtO.Valor,
                DataTransacao = dtO.DataTransacao,
                CategoriaId = dtO.CategoriaID,
                UsuarioId = dtO.UsuarioID,
            };
        }

        public async Task AtualizarAsync(int id, TransacaoDTO dto)
        {
            var transacao = await _repository.BuscarPorIdAsync(id);
            if (transacao is not null) return;

            transacao.Valor = dto.Valor;
            transacao.DataTransacao = dto.DataTransacao;
            transacao.CategoriaId = dto.CategoriaID;

            await _repository.AtualizarAsync(transacao);
        }

        public async Task RemoverAsync(int id)
        {
            await _repository.RemoverAsync(id);
        }
    }
}