# Sistema de Gerenciamento de Usuários com Autenticação JWT

Este projeto é uma API desenvolvida com **NestJS** para gerenciar usuários, incluindo funcionalidades de autenticação utilizando **JWT (JSON Web Tokens)**. O sistema implementa os princípios do **SOLID** e segue boas práticas de desenvolvimento.

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

### **1. Clonar o Repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd user-management-api
```

### **2. Configurar o Arquivo `.env`**
Atualize o arquivo `.env` com as informações do banco e JWT:

```
DB_HOST=db
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=3600s
```

### **3. Subir os Contêineres com Docker**
Certifique-se de ter o **Docker** instalado e execute o seguinte comando para subir a API e o banco de dados:

```bash
docker-compose up --build
```

Isso criará os contêineres para a API e o banco de dados PostgreSQL.

### **4. Acessar o Servidor**
A API estará acessível em: `http://localhost:3000`

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

## **Contribuição**

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha nova feature'`)
4. Envie sua branch (`git push origin minha-feature`)
5. Abra um Pull Request

