using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Domain.Enums;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace ControleFinanceiro.Application.Services
{
    public class PdfService
    {
        private readonly ITransacaoRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PdfService(
            ITransacaoRepository repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<byte[]> GerarRelatorioMensalPdfAsync(PdfDownloadDTO dto)
        {
            var usuarioIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

            if (string.IsNullOrEmpty(usuarioIdClaim))
                throw new Exception("Usuário não autenticado.");

            var usuarioId = int.Parse(usuarioIdClaim);

            var transacoes = await _repository.ListarDoUsuarioAsync(usuarioId, null);

            var transacoesDoMes = transacoes
                .Where(t => t.DataTransacao.Month == dto.Mes && t.DataTransacao.Year == dto.Ano)
                .OrderByDescending(t => t.DataTransacao)
                .ToList();

            var totalReceitas = transacoesDoMes
                .Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = transacoesDoMes
                .Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Despesa)
                .Sum(t => t.Valor);

            var saldo = totalReceitas - totalDespesas;

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(20);
                    page.Header().Text($"Relatório Mensal {dto.Mes}/{dto.Ano}").Bold().FontSize(18);
                    page.Content().Column(col =>
                    {
                        col.Item().Text($"Total de Receitas: R$ {totalReceitas:F2}");
                        col.Item().Text($"Total de Despesas: R$ {totalDespesas:F2}");
                        col.Item().Text($"Saldo Final: R$ {saldo:F2}");
                        col.Item().PaddingTop(10);

                        // Tabela de transações: Categoria, Descrição, Valor, Data
                        col.Item().Table(t =>
                        {
                            t.ColumnsDefinition(c =>
                            {
                                c.RelativeColumn(2);
                                c.RelativeColumn(4);
                                c.ConstantColumn(80);
                                c.ConstantColumn(90);
                            });
                            t.Header(h =>
                            {
                                h.Cell().Element(CellHeader).Text("Categoria");
                                h.Cell().Element(CellHeader).Text("Descrição");
                                h.Cell().Element(CellHeader).Text("Valor");
                                h.Cell().Element(CellHeader).Text("Data");
                            });
                            foreach (var tr in transacoesDoMes)
                            {
                                var cor = tr.Categoria.Tipo == TipoCategoriaEnum.Receita ? Colors.Green.Medium : Colors.Red.Medium;
                                t.Cell().Element(c => CellBody(c).Background(cor)).Text(txt =>
                                {
                                    txt.DefaultTextStyle(s => s.FontColor(Colors.White));
                                    txt.Span(tr.Categoria?.Nome ?? "-");
                                });
                                t.Cell().Element(CellBody).Text(tr.Descricao);
                                t.Cell().Element(CellBody).Text($"R$ {tr.Valor:F2}");
                                t.Cell().Element(CellBody).Text(tr.DataTransacao.ToString("dd/MM/yyyy"));
                            }
                        });
                    });

                    page.Footer().AlignRight().Text(text =>
                    {
                        text.Span("Gerado em ");
                        text.Span(DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                    });
                });
            });

            static IContainer CellHeader(IContainer container) => container.Padding(4).Background(Colors.Grey.Lighten2).Border(1).BorderColor(Colors.Grey.Medium);
            static IContainer CellBody(IContainer container) => container.Padding(4).BorderBottom(1).BorderColor(Colors.Grey.Lighten3);

            return document.GeneratePdf();
        }
    }
}
