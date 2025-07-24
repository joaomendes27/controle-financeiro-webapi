namespace Controle_Financeiro.DTOs
{
    public class TransacaoRespostaDTO
    {
        public int Id { get; set; }
        public double Valor {  get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public string Categoria { get; set; } = string.Empty;
    }
}
