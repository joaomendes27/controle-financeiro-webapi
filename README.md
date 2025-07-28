# Controle Financeiro WebAPI

Este projeto consiste em uma **Web API** em **ASP.NET Core** para controle de finanças pessoais, com um **front-end em Angular** que consome a API.

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

