using Controle_Financeiro.DTOs;
using Controle_Financeiro.Repositories;
using Controle_Financeiro.Models;
using Controle_Financeiro.Services.Auth;

namespace ControleFinanceiro.Application.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly TokenService _tokenService;


        public UsuarioService(IUsuarioRepository repository, TokenService tokenService)
        {
            _usuarioRepository = repository;
            _tokenService = tokenService;
        }

        public async Task CadastrarAsync(UsuarioDTO dto)
        {
            var usuarioComMesmoNome = await _usuarioRepository.BuscarPorNomeAsync(dto.Nome);
            if (usuarioComMesmoNome != null)
            {
                throw new Exception("Nome de usuário já está em uso.");
            }

            var usuarioComMesmoEmail = await _usuarioRepository.BuscarPorEmailAsync(dto.Email); 
            if (usuarioComMesmoEmail != null)
            {
                throw new Exception("E-mail já está em uso.");
            }

            var usuario = new Usuario(dto.Nome, dto.Email, dto.Senha);
            await _usuarioRepository.CadastrarAsync(usuario);
        }
        
        public async Task<string> LoginAsync(UsuarioLoginDTO dto)
        {
            var usuario = await _usuarioRepository.BuscarPorNomeAsync(dto.EmailOuUsuario)
                ?? await _usuarioRepository.BuscarPorEmailAsync(dto.EmailOuUsuario);

            if (usuario == null || usuario.Senha != dto.Senha)
                throw new Exception("Usuário ou Senha inválidos!");

            return _tokenService.GenerateToken(usuario);
        }
    }
}
