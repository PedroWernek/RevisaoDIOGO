import { useEffect, useState } from "react";
import { Produto } from "../../models/Produto";
import { Link } from "react-router-dom";

function ListarProdutos(){

    const [produtos, setProdutos] = useState<Produto[]>([])
    
    useEffect(() => {
        fetch("http://localhost:5074/listar/produtos")
        .then(resposta => resposta.json())
        .then(produtos => setProdutos(produtos));
    },[])

    function deletar(id : string){
    fetch(`http://localhost:5074/deletar/produto/${id}` ,{
        method : "DELETE"
    })
    .then(resposta => resposta.json)
    .then(produto => console.log(produto))
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>CriadoEm</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                {produtos.map(produto => (
                    <tr key={produto.produtoId}>
                        <td>{produto.produtoId}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.quantidade}</td>
                        <td>{produto.preco}</td>
                        <td>{produto.categoria?.nome}</td>
                        <td>{produto.criadoEm}</td>
                        <td><Link to={`/produto/editar/${produto.produtoId}`}>Editar</Link></td>
                        <td><button onClick={() => deletar(produto.produtoId!)}>Deletar</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListarProdutos;