namespace ControleFinanceiro.Application.Features.TransacoesFeature.Queries.FiltrarTransacoesMesAno
{

    public class FiltrarTransacoesMesAnoQuery
    {
        public int UsuarioId { get; set; }
        public int Mes { get; set; }
        public int Ano { get; set; }
    }
}