import { useEffect, useState } from "react";
import { Categoria } from "../../models/Categoria";
import { Produto } from "../../models/Produto";
import { useParams } from "react-router-dom";

function EditarProduto(){

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");
    const [categoriaId, setCategoriaId] = useState(1);
    const [categorias, setCategorias] = useState<Categoria[]>([])
    
    const { id } = useParams();

    useEffect(() => {
        if(id){
        fetch(`http://localhost:5074/buscar/produto/${id}`)
            .then(resposta => {return resposta.json()})
            .then(produto => {
                setNome(produto.nome)
                setQuantidade(produto.quantidade)
                setPreco(produto.preco)
                setCategoriaId(produto.categoriaId)
            });


            fetch("http://localhost:5074/listar/categorias")
            .then(resposta => {return resposta.json()})
            .then(categorias => setCategorias(categorias));
        }
    },[])

    function HandleSubmit(e:any){

        e.preventDefault()

        const produtoEditar : Produto = {
            nome : nome,
            quantidade : Number(quantidade),
            preco : Number(preco),
            categoriaId : categoriaId
        }

        fetch(`http://localhost:5074/editar/produto/${id}` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(produtoEditar)
        })
        .then(resposta => {return resposta.json()})
        .then(produtoCriado => console.log(produtoCriado));
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" value={nome} onChange={(e:any) => setNome(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="quantidade">Quantidade:</label>
                    <input type="text" value={quantidade} onChange={(e:any) => setQuantidade(e.target.value)}/>
                </div>
                <label htmlFor="preco">Preço:</label>
                    <input type="text" value={preco} onChange={(e:any) => setPreco(e.target.value)}/>
                <div>
                <label htmlFor="categoria">Categoria:</label>
                    <select value={categoriaId} onChange={(e:any) => setCategoriaId(Number(e.target.value))}>
                        {categorias.map(categoria => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.nome}</option>
                        ))
                        }
                    </select>
                </div>
                <button type="submit">Editar</button>
            </form>
        </div>
    )
}

export default EditarProduto;