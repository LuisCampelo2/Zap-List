# 🛒 Lista de Compras – Aplicação Web Full Stack

Aplicação completa para **gerenciamento de listas de compras**, com autenticação, banco de dados e painel interativo. Pensada para oferecer uma experiência simples e prática ao usuário, permitindo criar múltiplas listas, buscar produtos e organizá-los com facilidade.

---

## ✨ Funcionalidades Principais

- **✅ Gerenciamento de listas personalizadas**  
  Crie, edite e exclua listas como “Feira de sábado”, “Compra do mês”, etc.

- **🛍️ Adição de produtos via catálogo pesquisável**  
  Encontre produtos com filtros e adicione rapidamente às listas.

- **📋 Visualização e edição de listas**  
  Veja todos os itens, altere quantidades ou remova o que não quiser mais.

- **🔐 Autenticação segura com JWT + cookies**  
  Cadastro, login e sessões protegidas.

- **📧 Envio de e-mail automático (ex: confirmação de cadastro)**

---

## 🛠️ Tecnologias Utilizadas

### 🌐 Frontend – React (com Vite + TypeScript)

- **React 19** – Interface moderna e rápida
- **Redux Toolkit** – Gerenciamento de estado simplificado
- **React Router DOM** – Navegação entre páginas
- **Framer Motion** – Animações suaves
- **Bootstrap 5 + Bootstrap Icons** – UI responsiva
- **Axios** – Requisições HTTP para o backend

### 🔧 Backend – Node.js com Express

- **Express.js** – API RESTful robusta
- **MySQL + Sequelize** – ORM para manipulação de dados
- **bcrypt** – Criptografia de senhas
- **JWT** – Autenticação baseada em tokens
- **cookie-parser** – Gerenciamento de sessões
- **Dotenv** – Variáveis de ambiente seguras
- **UUID** – Identificadores únicos
- **Node-cron + Puppeteer + Cheerio** – Tarefas agendadas e raspagem de dados
- **Nodemailer** – Envio automático de e-mails

---

## 🚀 Como rodar o projeto localmente

### 1. Backend

```bash
cd server
npm install
npm run start
