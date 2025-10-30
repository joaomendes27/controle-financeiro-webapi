using ControleFinanceiro.Application.Features.UsuarioFeature.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly CadastrarUsuarioCommandHandler _cadastrarHandler;
        private readonly LoginUsuarioCommandHandler _loginHandler;

        public UsuarioController(
            CadastrarUsuarioCommandHandler cadastrarHandler,
            LoginUsuarioCommandHandler loginHandler)
        {
            _cadastrarHandler = cadastrarHandler;
            _loginHandler = loginHandler;
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] CadastrarUsuarioCommand command)
        {
            try
            {
                await _cadastrarHandler.Handle(command);
                return Ok("Usuário cadastrado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUsuarioCommand command)
        {
            try
            {
                var token = await _loginHandler.Handle(command);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
