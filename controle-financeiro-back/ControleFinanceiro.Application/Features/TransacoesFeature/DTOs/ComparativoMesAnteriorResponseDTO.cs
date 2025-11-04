namespace ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;

public class ComparativoMesAnteriorResponseDTO
{
    public double TotalReceitas { get; set; }
    public double TotalDespesas { get; set; }
    public double Saldo => TotalReceitas - TotalDespesas;
}
