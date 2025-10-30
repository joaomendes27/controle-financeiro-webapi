using ControleFinanceiro.Domain.Enums;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ListarTransacoesDoUsuario
{

    public class ListarTransacoesDoUsuarioQuery
    {
        public int UsuarioId { get; set; }
        public TipoCategoriaEnum? Tipo { get; set; }
    }
}