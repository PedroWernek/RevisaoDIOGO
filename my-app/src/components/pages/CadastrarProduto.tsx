import { useEffect, useState } from "react";
import { Categoria } from "../../models/Categoria";
import { Produto } from "../../models/Produto";

function CadastrarProduto(){

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");
    const [categoriaId, setCategoriaId] = useState(1);
    const [categorias, setCategorias] = useState<Categoria[]>([])
    
    useEffect(() => {
        
        fetch("http://localhost:5074/listar/categorias")
        .then(resposta => {return resposta.json()})
        .then(categorias => setCategorias(categorias));
    },[])

    function HandleSubmit(e:any){

        e.preventDefault()

        const produto : Produto = {
            nome : nome,
            quantidade : Number(quantidade),
            preco : Number(preco),
            categoriaId : categoriaId
        }

        fetch("http://localhost:5074/cadastrar/produto" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(produto)
        })
        .then(resposta => {return resposta.json()})
        .then(produtoCriado => console.log(produtoCriado));
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" onChange={(e:any) => setNome(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="quantidade">Quantidade:</label>
                    <input type="text" onChange={(e:any) => setQuantidade(e.target.value)}/>
                </div>
                <label htmlFor="preco">Preço:</label>
                    <input type="text" onChange={(e:any) => setPreco(e.target.value)}/>
                <div>
                <label htmlFor="categoria">Categoria:</label>
                    <select onChange={(e:any) => setCategoriaId(Number(e.target.value))}>
                        {categorias.map(categoria => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.nome}</option>
                        ))
                        }
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastrarProduto;