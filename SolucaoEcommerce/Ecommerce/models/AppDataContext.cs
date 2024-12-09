using System;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.models;

public class AppDataContext : DbContext
{
    public DbSet<Produto>? TabelaProdutos { get; set; }
    public DbSet<Categoria>? TabelaCategorias { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Ecommerce.db");
    }
}
