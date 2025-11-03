namespace ControleFinanceiro.Application.Features.TransacoesFeature.DTOs;

public class RecorrenciaResponseDTO
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public double Valor { get; set; }
    public int DiaDoMes { get; set; }
    public int CategoriaId { get; set; }
    public bool Ativo { get; set; }
    public DateTime? UltimaGeracao { get; set; }
}
