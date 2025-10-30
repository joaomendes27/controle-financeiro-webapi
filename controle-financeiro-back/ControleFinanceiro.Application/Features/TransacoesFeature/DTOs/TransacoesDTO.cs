


namespace ControleFinanceiro.Application.Features.TransacoesFeature.DTOs

{
    public class TransacoesDTO
    { 
        public double Valor {  get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataTransacao { get; set; }
        public int CategoriaID { get; set; }
    }
}
