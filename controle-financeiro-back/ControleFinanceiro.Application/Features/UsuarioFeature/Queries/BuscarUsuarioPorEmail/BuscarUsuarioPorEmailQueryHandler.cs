using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;

namespace ControleFinanceiro.Application.Features.UsuarioFeature.Queries
{
    public class BuscarUsuarioPorEmailQueryHandler
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public BuscarUsuarioPorEmailQueryHandler(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario?> Handle(BuscarUsuarioPorEmailQuery query)
        {
            return await _usuarioRepository.BuscarPorEmailAsync(query.Email);
        }
    }
}