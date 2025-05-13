import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="introduction">
        <h1>🛒 Como criar sua lista de compras</h1>
        <ul>
          <li>Acesse a página de Listas No menu principal que se encontra como "Listas de compra" caso ja tenha criado uma.</li>
          <li>
            Caso nao tenha criado, crie uma nova lista clicando em{" "}
            <button
              style={{
                color: "white",
                backgroundColor: "rgb(16, 18, 24)",
                borderRadius: "30px",
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/createList">
                Criar Lista De compras
              </Link>
            </button>
          </li>
          <li>
            Dê um nome para sua lista (ex: "Compra do mês", "Feira de sábado",
            etc.) e salve.
          </li>
          <li>
            {" "}
            Vá para a página de Produtos Depois de criar sua lista, acesse a aba
            ou link de "Produtos" no menu.
          </li>
          <li>
            {" "}
            Adicione produtos à sua lista Navegue pelos produtos disponíveis.
          </li>
          <li>
            {" "}
            Use o campo de busca ou os filtros para encontrar o que deseja.
          </li>
          <li> Clique no botão "Adicionar à lista" no produto desejado.</li>
          <li>
            {" "}
            Selecione a lista que você criou anteriormente para adicionar o item
            nela.
          </li>
          <li>
            Repita o processo para todos os produtos que quiser adicionar.{" "}
          </li>
          <li>
            Confira sua lista de compras Volte na aba "Listas" e clique na lista
            que você criou. Lá você verá todos os produtos adicionados e poderá
            editar ou remover itens.
          </li>
        </ul>
      </div>
    </main>
  );
};
