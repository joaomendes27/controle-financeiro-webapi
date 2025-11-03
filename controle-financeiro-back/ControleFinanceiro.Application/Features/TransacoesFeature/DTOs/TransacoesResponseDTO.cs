namespace ControleFinanceiro.Application.Features.TransacoesFeature.DTOs
{
    public class TransacoesResponseDTO
    {
        public int Id { get; set; }
        public double Valor { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public int CategoriaId { get; set; } 

    }
}
