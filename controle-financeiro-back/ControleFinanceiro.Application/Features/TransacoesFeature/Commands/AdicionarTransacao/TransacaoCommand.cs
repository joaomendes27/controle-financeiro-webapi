namespace ControleFinanceiro.Application.Features.TransacoesFeature.Commands.AdicionarTransacao
{
    public class TransacaoCommand
    {
        public double Valor { get; set; }
        public string Descricao { get; set; }
        public DateTime DataTransacao { get; set; }
        public int CategoriaId { get; set; }
    }
}
