namespace Controle_Financeiro.DTOs
{
    public class TransacaoRespostaDTO
    {
        public double Valor {  get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public string Categoria { get; set; }
    }
}
