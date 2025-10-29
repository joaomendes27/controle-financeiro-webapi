namespace Controle_Financeiro.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public double Valor { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataTransacao { get; set; } = DateTime.Now;
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }


        public Transacao () { }

        public Transacao (double valor, DateTime data)
        {
            Valor = valor;
            DataTransacao = data;
        }
    }
}
