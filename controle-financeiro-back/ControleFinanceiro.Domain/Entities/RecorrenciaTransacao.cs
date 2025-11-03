namespace ControleFinanceiro.Domain.Entities;

public class RecorrenciaTransacao
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public double Valor { get; set; }
    public int DiaDoMes { get; set; }
    public bool Ativo { get; set; } = true;

    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; }

    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }

    public DateTime? UltimaGeracao { get; set; }
}
