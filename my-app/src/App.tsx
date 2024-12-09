import React from "react";
import CadastrarProduto from "./components/pages/CadastrarProduto";
import ListarProdutos from "./components/pages/ListarProdutos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import EditarProduto from "./components/pages/EditarProduto";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/produto/cadastrar">Cadastrar Produto</Link>
            </li>
            <li>
              <Link to="/produtos/listar">Listar Produtos</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/produto/cadastrar" element={<CadastrarProduto/>}/>
          <Route path="/produtos/listar" element={<ListarProdutos/>}/>
          <Route path="/produto/editar/:id" element={<EditarProduto/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
