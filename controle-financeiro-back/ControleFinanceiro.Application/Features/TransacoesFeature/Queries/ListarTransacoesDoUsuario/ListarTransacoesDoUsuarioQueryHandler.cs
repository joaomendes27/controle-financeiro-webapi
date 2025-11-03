using ControleFinanceiro.Domain.Interfaces;
using ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ListarTransacoesDoUsuario
{
    public class ListarTransacoesDoUsuarioQueryHandler
    {
        private readonly ITransacaoRepository _repository;

        public ListarTransacoesDoUsuarioQueryHandler(ITransacaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TransacoesResponseDTO>> Handle(ListarTransacoesDoUsuarioQuery query)
        {
            var transacoes = await _repository.ListarDoUsuarioAsync(query.UsuarioId, query.Tipo);

            return transacoes.Select(t => new TransacoesResponseDTO
            {
                Id = t.Id,
                Valor = t.Valor,
                Descricao = t.Descricao,
                Data = t.DataTransacao,
                CategoriaId = t.Categoria.Id, 
            }).ToList();
        }
    }
}