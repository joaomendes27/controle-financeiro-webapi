using Controle_Financeiro.DTOs;
using Controle_Financeiro.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioService _relatorioService;

        public RelatorioController(RelatorioService relatorioService)
        {
            _relatorioService = relatorioService;
        }

        [HttpPost("download")]
        [Authorize]
        public async Task<IActionResult> BaixarRelatorio([FromForm] RelatorioDownloadDTO dto)
        {
            var pdf = await _relatorioService.GerarRelatorioMensalPdfAsync(dto);
            return File(pdf, "application/pdf", $"relatorio-{dto.Mes}-{dto.Ano}.pdf");
        }
    }
}
