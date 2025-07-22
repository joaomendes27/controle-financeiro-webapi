namespace Controle_Financeiro.Models
{
    public class Categoria
    {
        public int Id { get;  set; }
        public string Nome { get;  set; }

        public string Tipo { get; set; }

        public Categoria() { }

        public Categoria(string nome, string tipo)
        {
            Nome = nome;
            Tipo = tipo;
        }

    }
}
