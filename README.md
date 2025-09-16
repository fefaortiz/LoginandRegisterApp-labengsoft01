# Aplicação Full Stack de Autenticação de Usuários

Uma aplicação web moderna com um sistema completo de autenticação de usuários. Construída com frontend em React, backend em FastAPI (Python) e banco de dados MongoDB.

## Funcionalidades

* **Cadastro de Usuário**: Novos usuários podem criar uma conta com nome de usuário, email e senha.
* **Login de Usuário**: Usuários cadastrados podem fazer login para acessar o conteúdo.
* **Autenticação com JWT**: Gerencia as sessões dos usuários de forma segura usando JSON Web Tokens.
* **Hashing de Senhas**: As senhas dos usuários são armazenadas de forma segura usando o algoritmo bcrypt.
* **Frontend Responsivo**: Uma interface de usuário limpa construída com React.

---
## Tecnologias Utilizadas

* **Frontend**: React
* **Backend**: Python com FastAPI
* **Banco de Dados**: MongoDB (via MongoDB Atlas)
* **Servidor**: Uvicorn

---
## Como Começar

Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

* Node.js e npm
* Python 3 e pip
* Git
* Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 1. Clone o Repositório

Primeiro, clone o projeto do GitHub para a sua máquina local:
```bash
git clone https://github.com/fefaortiz/LoginandRegisterApp-labengsoft01.git
cd my-python-app
```

---
### 2. Configuração do Backend e do Banco de Dados

1.  **Navegue até o diretório `backend`:**
    ```bash
    cd backend
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate  # No Windows: .venv\Scripts\activate
    ```

3.  **Instale todos os pacotes Python necessários:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Crie um Cluster gratuito com o nome de MyAPPLogin no site do MongoDB Atlas e faça a conexão do jeito que preferir**
  
5.  **Crie o arquivo de ambiente:** Crie um arquivo chamado `.env` dentro da pasta `backend`. Adicione sua connection string do MongoDB e uma chave secreta para o JWT:
    ```ini
    MONGO_URI=sua_connection_string_do_mongodb_atlas
    JWT_SECRET=uma_chave_secreta_longa_e_gerada_aleatoriamente
    ```

---
### 3. Configuração do Frontend

1.  **Navegue até o diretório `frontend`** a partir da raiz do projeto:
    ```bash
    cd ../frontend
    ```

2.  **Instale todos os pacotes npm necessários:**
    ```bash
    npm install
    ```

---
### 4. Executando a Aplicação

Você precisa executar os servidores de backend e frontend simultaneamente em dois terminais separados.

* **Execute o Servidor Backend (Terminal 1):**
    ```bash
    # Certifique-se de que você está no diretório 'backend'
    # e que seu ambiente virtual está ativado.
    uvicorn main:app --reload
    ```
    ✅ O backend estará rodando em `http://localhost:8000`.

* **Execute o Servidor Frontend (Terminal 2):**
    ```bash
    # Certifique-se de que você está no diretório 'frontend'
    npm start
    ```
    ✅ O frontend abrirá no seu navegador em `http://localhost:3000`.
