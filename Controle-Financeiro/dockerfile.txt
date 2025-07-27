dashboard-layout.scss
.dashboard-layout {
  display: flex;
  justify-content: flex-start; /* Alinha o conteúdo ao longo do eixo horizontal */
  align-items: center; /* Centraliza a sidebar verticalmente */

  .sidebar {
    width: 250px; /* Largura fixa */
    background-color: #333;
    color: white;
    padding: 20px;
    height: 50vh; /* A altura é metade da tela (50% da altura da viewport) */
    position: relative; /* Necessário para o posicionamento absoluto */

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 15px 0;

        a {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          display: block;

          &:hover {
            color: #28a745;
          }

          &.active {
            font-weight: bold;
            color: #28a745;
          }
        }
      }
    }
  }
  /* Estilo para o botão de logout */
  /* Estilo para o botão de logout */
  .logout-btn {
    background-color: #f44336; /* Cor vermelha */
    color: white;
    border: none;
    padding: 8px 16px; /* Ajusta o padding */
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    border-radius: 5px;
    width: auto; /* Ajuste a largura para caber no conteúdo */
    display: inline-block; /* Para garantir que o botão não ocupe a largura total */
  }

  .logout-btn:hover {
    background-color: #d32f2f; /* Cor mais escura ao passar o mouse */
  }

  .main-content {
    flex-grow: 1;
    padding: 20px;
  }
}

dashboard-home.scss
.dashboard-home {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #28a745;
    color: white;
    border-radius: 10px;

    h2 {
      margin: 0;
    }

    .btn-download {
      padding: 10px 20px;
      background-color: #218838;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .content {
    margin-top: 20px;
    padding: 20px;
    background-color: #f3f1ec;
    border-radius: 10px;
  }

  .totais {
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
  }
}

listar-transacoes.scss
.transacoes-container {
  padding: 20px;
  background-color: #f3f1ec;
  border-radius: 10px;

  h2 {
    text-align: center;
    color: black;
  }

  .transacoes {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .receitas,
  .despesas {
    width: 45%;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  table {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #28a745;
    color: white;
  }

  .error-message {
    color: red;
    text-align: center;
  }
}

