using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Domain.Enums;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

namespace ControleFinanceiro.Application.Services;

public class ExcelService
{
    private readonly ITransacaoRepository _repository;
    private readonly IHttpContextAccessor _http;

    public ExcelService(ITransacaoRepository repository, IHttpContextAccessor http)
    {
        _repository = repository;
        _http = http;
    }

    public async Task<byte[]> GerarRelatorioMensalExcelAsync(PdfDownloadDTO dto)
    {
        var userId = int.Parse(_http.HttpContext!.User.FindFirst("id")!.Value);
        var transacoes = await _repository.ListarDoUsuarioAsync(userId, null);
        var doMes = transacoes
        .Where(t => t.DataTransacao.Month == dto.Mes && t.DataTransacao.Year == dto.Ano)
        .OrderByDescending(t => t.DataTransacao)
        .ToList();

        double totalReceitas = doMes.Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Receita).Sum(t => t.Valor);
        double totalDespesas = doMes.Where(t => t.Categoria.Tipo == TipoCategoriaEnum.Despesa).Sum(t => t.Valor);
        double saldo = totalReceitas - totalDespesas;

        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        using var package = new ExcelPackage();

        var resumo = package.Workbook.Worksheets.Add("Resumo");
        resumo.Cells[1, 1].Value = $"Resumo {dto.Mes}/{dto.Ano}";
        resumo.Cells[1, 1].Style.Font.Bold = true;
        resumo.Cells[3, 1].Value = "Total Receitas";
        resumo.Cells[3, 2].Value = totalReceitas;
        resumo.Cells[4, 1].Value = "Total Despesas";
        resumo.Cells[4, 2].Value = totalDespesas;
        resumo.Cells[5, 1].Value = "Saldo Final";
        resumo.Cells[5, 2].Value = saldo;
        resumo.Cells[3, 2, 5, 2].Style.Numberformat.Format = "R$ #,##0.00";
        resumo.Cells[3, 1, 5, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
        resumo.Cells.AutoFitColumns();

        var ws = package.Workbook.Worksheets.Add("Transacoes");
        ws.Cells[1, 1].Value = "Categoria";
        ws.Cells[1, 2].Value = "Descrição";
        ws.Cells[1, 3].Value = "Valor";
        ws.Cells[1, 4].Value = "Data";
        ws.Row(1).Style.Font.Bold = true;
        ws.Row(1).Style.Fill.PatternType = ExcelFillStyle.Solid;
        ws.Row(1).Style.Fill.BackgroundColor.SetColor(Color.LightGray);

        int row = 2;
        foreach (var t in doMes)
        {
            ws.Cells[row, 1].Value = t.Categoria?.Nome;
            ws.Cells[row, 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            ws.Cells[row, 1].Style.Fill.BackgroundColor.SetColor(
            t.Categoria?.Tipo == TipoCategoriaEnum.Receita ? Color.FromArgb(0, 176, 80) : Color.FromArgb(192, 0, 0));
            ws.Cells[row, 1].Style.Font.Color.SetColor(Color.White);

            ws.Cells[row, 2].Value = t.Descricao;
            ws.Cells[row, 3].Value = t.Valor;
            ws.Cells[row, 4].Value = t.DataTransacao;
            ws.Cells[row, 4].Style.Numberformat.Format = "dd/mm/yyyy";
            row++;
        }
        ws.Column(3).Style.Numberformat.Format = "R$ #,##0.00";
        ws.Cells.AutoFitColumns();

        return package.GetAsByteArray();
    }
}
