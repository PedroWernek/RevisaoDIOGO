using System;

namespace Ecommerce.models;

public class Produto
{
    public string ProdutoId { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public int Quantidade { get; set; }
    public double Preco { get; set; }
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
