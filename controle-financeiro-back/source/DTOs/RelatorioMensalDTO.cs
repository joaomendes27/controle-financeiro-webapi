namespace Controle_Financeiro.DTOs
{
    public class RelatorioMensalDTO
    {
        public double TotalReceitas { get; set; }
        public double TotalDespesas { get; set; }
        public double Saldo => TotalReceitas + TotalDespesas;
    }
}
