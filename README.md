# BlueBoard

BlueBoard é uma aplicação simples de gerenciamento de tarefas e quadros (boards), desenvolvida como produto inicial da iniciativa Blue White.

O objetivo do projeto é fornecer uma base sólida de arquitetura fullstack moderna, com backend estruturado, autenticação segura e integração com banco de dados.

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- PostgreSQL
- JWT (JSON Web Token)
- Prisma (se estiver usando)

### Frontend (em desenvolvimento)
- React
- Vite
- Axios

---

## 📦 Funcionalidades (MVP)

- Cadastro de usuário
- Login com autenticação JWT
- Criação de Boards
- Listagem de Boards
- Atualização de Boards
- Exclusão de Boards

---

## 🔐 Autenticação

A autenticação é feita utilizando JWT.

Fluxo:
1. Usuário se registra
2. Usuário faz login
3. Recebe um token JWT
4. Token deve ser enviado no header:

Authorization: Bearer TOKEN_AQUI

---

## 🗄 Banco de Dados

PostgreSQL

Entidades principais:

User
- id
- name
- email
- password (hash)

Board
- id
- title
- userId
- createdAt

---

## ⚙️ Como rodar o projeto

1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/blueboard.git
