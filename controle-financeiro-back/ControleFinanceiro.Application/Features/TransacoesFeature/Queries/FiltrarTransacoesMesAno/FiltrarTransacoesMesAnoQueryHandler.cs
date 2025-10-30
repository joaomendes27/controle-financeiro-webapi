using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Domain.Enums;
using ControleFinanceiro.Domain.Interfaces;


namespace ControleFinanceiro.Application.Features.TransacoesFeature.Queries.FiltrarTransacoesMesAno
{
    public class FiltrarTransacoesMesAnoQueryHandler
    {
        private readonly ITransacaoRepository _repository;

        public FiltrarTransacoesMesAnoQueryHandler(ITransacaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<PdfMensalDTO> Handle(FiltrarTransacoesMesAnoQuery query)
        {
            var transacoes = await _repository.FiltrarMesAnoAsync(query.UsuarioId, query.Mes, query.Ano);

            var totalReceitas = transacoes
                .Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = transacoes
                .Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Despesa)
                .Sum(t => t.Valor);

            return new PdfMensalDTO
            {
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
            };
        }
    }
}