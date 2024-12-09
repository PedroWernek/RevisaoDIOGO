using Ecommerce.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Hello World!");

app.MapPost("/cadastrar/categoria" , ([FromBody] Categoria categoria, [FromServices] AppDataContext ctx) =>
{
    ctx.TabelaCategorias?.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

app.MapPost("/cadastrar/produto" , ([FromBody] Produto produto, [FromServices] AppDataContext ctx) =>
{
    var Categoria = ctx.TabelaCategorias?.Find(produto.CategoriaId);
    if(Categoria == null){
        return Results.NotFound();
    }

    ctx.TabelaProdutos?.Add(produto);
    produto.Categoria = Categoria;
    ctx.SaveChanges();
    return Results.Created("", produto);
});

app.MapGet("/listar/categorias", ([FromServices] AppDataContext ctx) => 
{
    return Results.Ok(ctx.TabelaCategorias?.ToList());
});

app.MapGet("/listar/produtos", ([FromServices] AppDataContext ctx) => 
{
    return Results.Ok(ctx.TabelaProdutos?.Include(x => x.Categoria).ToList());
});

app.MapPut("/editar/produto/{id}", ([FromRoute] string id, [FromBody] Produto produtoAlterado, [FromServices] AppDataContext ctx) =>
{
    Produto? produto = ctx.TabelaProdutos?.Find(id);
    if(produto == null){
        return Results.NotFound();
    }
    Categoria? categoria = ctx.TabelaCategorias?.Find(produtoAlterado.CategoriaId);
    if(categoria == null){
        return Results.NotFound();
    }

    produto.Preco = produtoAlterado.Preco;
    produto.Nome = produtoAlterado.Nome;
    produto.Quantidade = produtoAlterado.Quantidade;
    produto.Categoria = categoria;
    produto.CategoriaId = produtoAlterado.CategoriaId;

    ctx.TabelaProdutos?.Update(produto);
    ctx.SaveChanges();
    return Results.Ok(produto);
});

app.MapDelete("/deletar/produto/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    var Produto = ctx.TabelaProdutos?.Find(id);
    if(Produto == null){
        return Results.NotFound();
    }
    ctx.TabelaProdutos?.Remove(Produto);
    ctx.SaveChanges();
    return Results.Ok(Produto);
});

app.MapGet("/buscar/produto/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.TabelaProdutos?.Include(x => x.Categoria).FirstOrDefault(x => x.ProdutoId == id));
});
app.MapGet("/buscar/produtos/categoria:{id}" ,([FromRoute] int id, [FromServices] AppDataContext ctx) =>{
    if(ctx.TabelaProdutos?.Count() <= 0){
        return Results.NotFound();
    }
    return Results.Ok(ctx.TabelaProdutos?.Where(x => x.CategoriaId == id).ToList());
});

app.UseCors("Acesso Total");

app.Run();
