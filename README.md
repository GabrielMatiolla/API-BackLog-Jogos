# 🎮 BackLog de Jogos - API & Front-end

Projeto desenvolvido para a disciplina de Desenvolvimento de Serviços e APIs. Trata-se de uma aplicação Web Full Stack para gerenciamento de uma biblioteca pessoal de jogos, com foco em segurança, privacidade e integração com APIs externas.

## 🚀 Tecnologias Utilizadas

* **Back-end:** Node.js, Express, Axios
* **Banco de Dados:** MySQL (via XAMPP), Sequelize (ORM)
* **Segurança:** JWT (JSON Web Token), Bcrypt, Dotenv
* **Autenticação Externa:** OAuth 2.0 (GitHub)
* **Front-end:** HTML5, CSS3 Moderno (Glassmorphism), JavaScript Puro

## ⚙️ Funcionalidades

O sistema atende aos seguintes requisitos:

* **Autenticação e Segurança:**
    * [x] Registro de novos usuários com senha criptografada.
    * [x] Login tradicional (Email/Senha) com emissão de Token JWT.
    * [x] **Login Social (OAuth 2.0):** Integração com a API do GitHub para autenticação rápida.
    * [x] Middleware de proteção de rotas (Barreira de segurança).
* **Gerenciamento de Jogos (CRUD):**
    * [x] **Criar:** Adicionar jogos com Título, Plataforma, Status, Prioridade e URL de Imagem.
    * [x] **Listar:** Visualizar a biblioteca pessoal (privacidade garantida por usuário).
    * [x] **Editar:** Atualizar status, nota pessoal, imagem e prioridade.
    * [x] **Excluir:** Remover jogos da lista.

## 📦 Como Instalar e Rodar

### Pré-requisitos
* Node.js instalado.
* XAMPP (ou MySQL instalado separadamente).
* Uma conta no GitHub (para testar o OAuth).

### Passo a Passo

1.  **Configurar o Banco de Dados:**
    * Abra o XAMPP e inicie o serviço **MySQL**.
    * O Sequelize criará a tabela `backlog_games` automaticamente ao iniciar o servidor.
    * *Nota:* A configuração padrão espera o usuário `root` sem senha.

2.  **Instalar dependências do Back-end:**
    ```bash
    cd backend
    npm install
    ```

3.  **Configurar Variáveis de Ambiente (.env):**
    * Como o projeto utiliza chaves secretas, crie um arquivo chamado `.env` dentro da pasta `backend`.
    * Adicione o seguinte conteúdo (você precisará criar um OAuth App no GitHub para obter as chaves):
    ```env
    GITHUB_CLIENT_ID=SUA_CLIENT_ID_DO_GITHUB
    GITHUB_CLIENT_SECRET=SUA_CLIENT_SECRET_DO_GITHUB
    JWT_SECRET=sua_chave_secreta_jwt
    ```

4.  **Rodar o Servidor:**
    ```bash
    npm start
    ```
    *O servidor iniciará na porta 3000.*

5.  **Acessar o Front-end:**
    * Vá até a pasta `frontend`.
    * Abra o arquivo `index.html` no seu navegador (recomendado usar a extensão "Live Server" do VS Code).

## 📄 Documentação da API

| Método | Rota               | Descrição                          | Auth? |
| :----- | :----------------- | :--------------------------------- | :---- |
| POST   | `/users`           | Cria um novo usuário               | Não   |
| POST   | `/login`           | Login tradicional (JWT)            | Não   |
| GET    | `/github/login`    | Inicia fluxo OAuth com GitHub      | Não   |
| GET    | `/github/callback` | Recebe o código do GitHub          | Não   |
| GET    | `/jogos`           | Lista jogos do usuário logado      | Sim   |
| POST   | `/jogos`           | Adiciona um novo jogo              | Sim   |
| GET    | `/jogos/:id`       | Detalhes de um jogo específico     | Sim   |
| PUT    | `/jogos/:id`       | Atualiza um jogo                   | Sim   |
| DELETE | `/jogos/:id`       | Remove um jogo                     | Sim   |

---
**Desenvolvido por Gabriel Tadeu Matiolla & Thiago Figuereido.**
