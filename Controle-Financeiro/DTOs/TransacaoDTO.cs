
namespace Controle_Financeiro.DTOs

{
    public class TransacaoDTO
    { 
        public double Valor {  get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataTransacao { get; set; }
        public int CategoriaID { get; set; }
    }
}
