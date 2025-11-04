using ControleFinanceiro.Application.Features.RelatorioFeature.DTOs;
using ControleFinanceiro.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly PdfService _pdfService;
        private readonly ExcelService _excelService;

        public RelatorioController(PdfService pdfService, ExcelService excelService)
        {
            _pdfService = pdfService;
            _excelService = excelService;
        }

        [HttpPost("pdf")]
        [Authorize]
        public async Task<IActionResult> BaixarRelatorioPdf([FromBody] PdfDownloadDTO dto)
        {
            var pdf = await _pdfService.GerarRelatorioMensalPdfAsync(dto);
            return File(pdf, "application/pdf", $"relatorio-{dto.Mes}-{dto.Ano}.pdf");
        }

        [HttpPost("excel")]
        [Authorize]
        public async Task<IActionResult> BaixarRelatorioExcel([FromBody] PdfDownloadDTO dto)
        {
            var bytes = await _excelService.GerarRelatorioMensalExcelAsync(dto);
            return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"relatorio-{dto.Mes}-{dto.Ano}.xlsx");
        }
    }
}
