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

        public RelatorioController(PdfService pdfService)
        {
            _pdfService = pdfService;
        }

        [HttpPost("download")]
        [Authorize]
        public async Task<IActionResult> BaixarRelatorio([FromForm] PdfDownloadDTO dto)
        {
            var pdf = await _pdfService.GerarRelatorioMensalPdfAsync(dto);
            return File(pdf, "application/pdf", $"relatorio-{dto.Mes}-{dto.Ano}.pdf");
        }
    }
}
