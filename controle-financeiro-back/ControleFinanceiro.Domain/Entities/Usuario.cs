namespace ControleFinanceiro.Domain.Entities;

public class Usuario
{
    public int Id { get;  set; }
    public string Nome { get;  set; }
    public string Email { get;  set; }
    public string Senha { get; set; }
    public ICollection<Transacao> Transacoes { get; private set; } = new List<Transacao>();

    public Usuario() { }

    public Usuario (string nome, string email, string senha)
    {
        Nome = nome;
        Email = email;
        Senha = senha;  
    }
}
