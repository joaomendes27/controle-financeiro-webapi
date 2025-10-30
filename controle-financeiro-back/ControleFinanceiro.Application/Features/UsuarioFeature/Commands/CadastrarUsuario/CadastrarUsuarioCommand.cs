namespace ControleFinanceiro.Application.Features.UsuarioFeature.Commands
{
    public class CadastrarUsuarioCommand
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}