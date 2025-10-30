using ControleFinanceiro.Domain.Enums;

namespace ControleFinanceiro.Domain.Entities
{
    public class Categoria
    {
        public int Id { get;  set; }
        public string Nome { get;  set; }

        public TipoCategoriaEnum Tipo { get; set; }

        public Categoria() { }

        public Categoria(string nome)
        {
            Nome = nome;
        }
    }
}
