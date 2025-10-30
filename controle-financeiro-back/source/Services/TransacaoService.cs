using Controle_Financeiro.DTOs;
using Controle_Financeiro.Models;
using Controle_Financeiro.Models.Enums;
using Controle_Financeiro.Repositories;
using System.Drawing;

namespace Controle_Financeiro.Services
{
    public class TransacaoService
    {
        private readonly ITransacaoRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public TransacaoService(ITransacaoRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Transacao?> BuscarPorIdAsync(int id)
        {
            return await _repository.BuscarPorIdAsync(id);
        }

        public async Task AdicionarAsync(TransacaoDTO dtO)
        {
            var usuarioId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst("id").Value);
            var valor = dtO.Valor;

            if (dtO.CategoriaID == 1)
            {
                valor = Math.Abs(dtO.Valor); 
            }
            else if (dtO.CategoriaID == 2) 
            {
                valor = -Math.Abs(dtO.Valor);
            }

            var transacao = new Transacao
            {
                Valor = valor,
                Descricao = dtO.Descricao,
                DataTransacao = dtO.DataTransacao,
                CategoriaId = dtO.CategoriaID,
                UsuarioId = usuarioId
            };
            await _repository.AdicionarAsync(transacao);
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

        public async Task<List<TransacaoRespostaDTO>> ListarDoUsuarioAsync(int usuarioId, TipoCategoria? tipo)
        {
            var transacoes = await _repository.ListarDoUsuarioAsync(usuarioId, tipo);

            return transacoes.Select(t => new TransacaoRespostaDTO
            {
                Id = t.Id,
                Valor = t.Valor,
                Descricao = t.Descricao,
                Data = t.DataTransacao,
                Categoria = t.Categoria.Nome
            }).ToList();
        }

        public async Task<RelatorioMensalDTO> FiltrarMesAnoAsync(int usuarioId, int mes, int ano)
        {
            var transacoes = await _repository.FiltrarMesAnoAsync(usuarioId, mes, ano);

            var totalReceitas = transacoes
           .Where(t => t.Categoria.Tipo == TipoCategoria.Receita)
           .Sum(t => t.Valor);

            var totalDespesas = transacoes
            .Where(t => t.Categoria.Tipo == TipoCategoria.Despesa)
            .Sum(t => t.Valor);

            return new RelatorioMensalDTO
            {
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
            };
        }
    }
}