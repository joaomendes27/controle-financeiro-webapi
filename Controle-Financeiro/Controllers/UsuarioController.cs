using Controle_Financeiro.DTOs;
using Controle_Financeiro.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
       private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
           _usuarioService = usuarioService;
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromForm]UsuarioDTO dto)
        {
            try
            {
                await _usuarioService.CadastrarAsync(dto);
                return Ok("Usuário cadastrado com sucesso!");
            } 
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
