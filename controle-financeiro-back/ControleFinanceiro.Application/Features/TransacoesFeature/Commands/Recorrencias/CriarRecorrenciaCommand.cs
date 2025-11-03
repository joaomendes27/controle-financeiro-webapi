namespace ControleFinanceiro.Application.Features.TransacoesFeature.Commands.Recorrencias;

public class CriarRecorrenciaCommand
{
    public string Descricao { get; set; } = string.Empty;
    public double Valor { get; set; }
    public int DiaDoMes { get; set; }
    public int CategoriaId { get; set; }
}
