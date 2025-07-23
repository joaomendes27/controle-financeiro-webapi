using Controle_Financeiro.Models.Enums;

namespace Controle_Financeiro.Models
{
    public class Categoria
    {
        public int Id { get;  set; }
        public string Nome { get;  set; }

        public TipoCategoria Tipo { get; set; }

        public Categoria() { }

        public Categoria(string nome)
        {
            Nome = nome;
        }
    }
}
