using Controle_Financeiro.DTOs;
using Controle_Financeiro.Repositories;
using Controle_Financeiro.Models;

namespace Controle_Financeiro.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _usuarioRepository = repository;
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
    }
}
