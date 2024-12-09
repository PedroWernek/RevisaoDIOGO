using System;

namespace Ecommerce.models;

public class Categoria
{
    public int CategoriaId { get; set; }
    public string? Nome { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
