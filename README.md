# Sistema de Gerenciamento de Usuários com Autenticação JWT

Este projeto é uma API desenvolvida com **NestJS** para gerenciar usuários, incluindo funcionalidades de autenticação utilizando **JWT (JSON Web Tokens)**. 

---

## **Funcionalidades**

- **Gerenciamento de Usuários**:
  - Criar usuários
  - Listar todos os usuários (com paginação e filtragem de soft-delete)
  - Buscar um usuário por ID
  - Atualizar dados de usuários
  - Excluir usuários (Soft Delete)
  - Restaurar usuários soft-deletados

- **Autenticação**:
  - Login com email e senha
  - Geração de token JWT
  - Validação de tokens para acessar rotas protegidas

- **Segurança**:
  - Hashing de senhas com **bcrypt**
  - Validações de senha (mínimo 8 caracteres, pelo menos 1 maiúscula, 1 número e 1 caractere especial)

---

## **Tecnologias Utilizadas**

- **Node.js**
- **NestJS**
- **TypeScript**
- **JWT** para autenticação
- **TypeORM** como ORM
- **PostgreSQL** como banco de dados
- **bcrypt** para hashing de senhas
- **Jest** para testes unitários
- **Docker** para conteinerização

---

## **Instalação**

### **Clonar o Repositório**
```bash
git clone git@github.com:jonathanrodrigues12/user-management-api.git
cd user-management-api
```

### **Configurar o Arquivo `.env`**
Atualize o arquivo `.env` com as informações do banco e JWT:

```
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
DB_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=3600s
```

### **Subir os Contêineres com Docker**
Certifique-se de ter o **Docker** instalado e execute o seguinte comando para subir a API e o banco de dados:

```bash
docker-compose up --build
```
Isso criará os contêineres para a API e o banco de dados PostgreSQL.


## **Testes**

### **Rodar Testes Unitários**
```bash
docker exec -it user_management_api npm run test
```

### **Gerar Relatório de Cobertura**
```bash
docker exec -it user_management_api npm run test:cov
```

---

---
## **Caso não queria usar docker**
 Uma vez clonado o projeto, conforme passo 1.
 ### **2. Instalar Dependências**
```bash
npm install
```
### **Configurar o Banco de Dados**
Certifique-se de que o PostgreSQL esteja rodando e crie um banco de dados. Atualize o arquivo `.env` com as informações do banco:
```
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
DB_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=3600s
```

### **Rodar Migrações**
```bash
npm run migration:run
```

### **Iniciar o Servidor**
```bash
npm run start:dev
```

---

## **Testes**

### **Rodar Testes Unitários**
```bash
npm run test
```

---
 ### **Acessar o Servidor**
A API estará acessível em: `http://localhost:3000`
A documentação da API estará acessível em: `http://localhost:3000/api/docs`

---
## **Endpoints Disponíveis**

### **1. Gerenciamento de Usuários**

#### **Criar Usuário**
**POST /users**

Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password1!"
}
```

#### **Listar Usuários (Paginado)**
**GET /users?page=1&limit=10**

#### **Buscar Usuário por ID**
**GET /users/:id**

#### **Atualizar Usuário**
**PUT /users/:id**

Body:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

#### **Soft Delete de Usuário**
**DELETE /users/:id**

#### **Restaurar Usuário Soft-Deleted**
**PATCH /users/:id/restore**

---

### **2. Autenticação**

#### **Login**
**POST /auth/login**

Body:
```json
{
  "email": "john.doe@example.com",
  "password": "Password1!"
}
```

Resposta:
```json
{
  "access_token": "jwt-token-aqui"
}
```

#### **Validar Token**
**POST /auth/validate**

Header:
```
Authorization: Bearer jwt-token-aqui
```

Resposta:
```json
{
  "userId": "1",
  "email": "john.doe@example.com"
}
```
---

