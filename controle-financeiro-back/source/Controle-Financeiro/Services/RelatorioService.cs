using Controle_Financeiro.Data;
using Controle_Financeiro.DTOs;
using Controle_Financeiro.Repositories;
using QuestPDF.Fluent;

namespace Controle_Financeiro.Services
{
    public class RelatorioService
    {
        private readonly AppDbContext _context;
        private readonly ITransacaoRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RelatorioService(
            AppDbContext context,
            ITransacaoRepository repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<byte[]> GerarRelatorioMensalPdfAsync(RelatorioDownloadDTO dto)
        {
            try
            {
                var usuarioIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

                if (string.IsNullOrEmpty(usuarioIdClaim))
                    throw new Exception("Usuário não autenticado.");

                var usuarioId = int.Parse(usuarioIdClaim);

                var transacoes = await _repository.ListarDoUsuarioAsync(usuarioId, null);

                var transacoesDoMes = transacoes
                    .Where(t => t.DataTransacao.Month == dto.Mes && t.DataTransacao.Year == dto.Ano)
                    .ToList();

                var totalReceitas = transacoesDoMes
                .Where(t => t.Categoria.Id == 1) 
                .Sum(t => t.Valor);

                var totalDespesas = transacoesDoMes
                    .Where(t => t.Categoria.Id == 2) 
                    .Sum(t => t.Valor); 

                var saldo = totalReceitas + totalDespesas;

                var document = Document.Create(container =>
                {
                    container.Page(page =>
                    {
                        page.Margin(50);
                        page.Content().Column(col =>
                        {
                            col.Item().Text("Relatório Mensal").FontSize(20).Bold();
                            col.Item().Text($"Mês: {dto.Mes}/{dto.Ano}");
                            col.Item().Text($"Total de Receitas: R$ {totalReceitas:F2}");
                            col.Item().Text($"Total de Despesas: R$ {totalDespesas:F2}");
                            col.Item().Text($"Saldo Final: R$ {saldo:F2}");
                        });
                    });
                });

                return document.GeneratePdf();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao gerar o PDF: " + ex.Message, ex);
            }
        }
    }
}
