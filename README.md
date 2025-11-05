# Controle Financeiro WebApi

Este projeto é uma **Web API** construída com **ASP.NET Core** e um **front-end em Angular**. A aplicação permite que o usuário gerencie suas finanças pessoais de forma intuitiva e automatizada. As principais funcionalidades incluem:

- **Automação de Transações**: Permite que o usuário registre transações recorrentes automaticamente, sem precisar inserir manualmente os valores a cada mês.
- **Gráficos Interativos**: Exibe gráficos dinâmicos para visualizar os ganhos e gastos, oferecendo uma forma clara de analisar o desempenho financeiro.
- **Comparação Financeira**: Uma funcionalidade que compara a situação financeira atual do usuário com o mês anterior, ajudando a identificar tendências e tomar decisões mais informadas.


## Como Rodar o Projeto

Para rodar este projeto, você precisa iniciar tanto a API quanto o front-end.

### 1. Rodando o Back-End (API)

A API foi desenvolvida utilizando **ASP.NET Core**. Siga os passos abaixo para rodá-la:

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaomendes27/controle-financeiro-webapi.git

A API está dentro da pasta `Controle-Financeiro`. Siga os passos abaixo para rodá-la:

- Navegue até o diretório da API:
    ```bash
    cd controle-financeiro-webapi/Controle-Financeiro
    ```

- Restaure as dependências do projeto:
    ```bash
    dotnet restore
    ```

- Aplique as migrações para configurar o banco de dados:
    ```bash
    dotnet ef database update
    ```
- **Banco de Dados**: A API está utilizando um **SQL Server LocalDB** local por padrão. Se você preferir usar outro banco de dados, basta alterar a string de conexão no arquivo `Program` para o banco de sua escolha.

- Execute a aplicação:
    ```bash
    dotnet run
    ```

A API estará rodando localmente.

### 2. Rodando o Front-End (Angular)

O front-end foi desenvolvido utilizando **Angular**. Siga os passos abaixo para rodá-lo:

- Navegue até o diretório do front-end:
    ```bash
    cd frontend
    ```

- Instale as dependências do Angular:
    ```bash
    npm install
    ```

- Inicie o servidor de desenvolvimento do Angular:
    ```bash
    ng serve
    ```

