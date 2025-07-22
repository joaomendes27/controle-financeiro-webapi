
namespace Controle_Financeiro.DTOs

{
    public class TransacaoDTO
    {
        public int Id { get; set; } 
        public double Valor {  get; set; }
        public DateTime DataTransacao { get; set; }
        public int CategoriaID { get; set; }

        public int UsuarioID   { get; set; }
    }
}
