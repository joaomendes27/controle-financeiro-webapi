using ControleFinanceiro.Application.Features.TransacoesFeature.Services;
using ControleFinanceiro.Application.Services;
using ControleFinanceiro.Domain.Interfaces;

namespace ControleFinanceiro.Application.Features.UsuarioFeature.Commands;

public class LoginUsuarioCommandHandler
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly TokenService _tokenService;
    private readonly IRecorrenciaService _recorrenciaService;

    public LoginUsuarioCommandHandler(
    IUsuarioRepository usuarioRepository,
    TokenService tokenService,
    IRecorrenciaService recorrenciaService)
    {
        _usuarioRepository = usuarioRepository;
        _tokenService = tokenService;
        _recorrenciaService = recorrenciaService;
    }

    public async Task<string> Handle(LoginUsuarioCommand command)
    {
        var usuario = await _usuarioRepository.BuscarPorNomeAsync(command.EmailOuUsuario)
        ?? await _usuarioRepository.BuscarPorEmailAsync(command.EmailOuUsuario);

        if (usuario == null || usuario.Senha != command.Senha)
            throw new Exception("Usuário ou Senha inválidos!");

        await _recorrenciaService.ProcessarPendentesNoMesAsync(usuario.Id, DateTime.Now);

        return _tokenService.GenerateToken(usuario);
    }
}
