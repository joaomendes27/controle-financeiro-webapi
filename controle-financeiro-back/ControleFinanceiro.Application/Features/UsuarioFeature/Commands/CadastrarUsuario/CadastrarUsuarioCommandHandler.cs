using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;

namespace ControleFinanceiro.Application.Features.UsuarioFeature.Commands
{
    public class CadastrarUsuarioCommandHandler
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public CadastrarUsuarioCommandHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task Handle(CadastrarUsuarioCommand command)
        {
            var usuarioComMesmoNome = await _usuarioRepository.BuscarPorNomeAsync(command.Nome);
            if (usuarioComMesmoNome != null)
                throw new Exception("Nome de usuário já está em uso.");

            var usuarioComMesmoEmail = await _usuarioRepository.BuscarPorEmailAsync(command.Email);
            if (usuarioComMesmoEmail != null)
                throw new Exception("E-mail já está em uso.");

            var usuario = new Usuario(command.Nome, command.Email, command.Senha);
            await _usuarioRepository.CadastrarAsync(usuario);
        }
    }
}