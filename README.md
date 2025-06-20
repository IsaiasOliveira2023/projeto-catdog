Projeto CatDog
Descrição
Projeto full stack com backend Spring Boot (todosimple) e frontend React (frontend) para gerenciar usuários, pets e agendamentos.

Estrutura do Projeto
todosimple/ — backend Spring Boot

frontend/ — frontend React

Pré-requisitos
Java 24+

Maven 3.8+

Node.js 16+

npm ou yarn

MySQL rodando (configurado conforme application.properties no backend)

Configuração Backend (todosimple)
Ajuste o arquivo src/main/resources/application.properties com os dados do seu banco:

properties
Copiar
Editar
spring.datasource.url=jdbc:mysql://localhost:3306/catdog
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
No terminal, dentro da pasta todosimple, execute:

bash
Copiar
Editar
mvn clean install
mvn spring-boot:run
O backend iniciará na porta 8080.

Configuração Frontend (frontend)
No terminal, dentro da pasta frontend, execute:

bash
Copiar
Editar
npm install
npm start
O frontend rodará em http://localhost:3000 e consumirá a API do backend.

Endpoints Principais (Backend)
Usuários
POST /users — Criar usuário

GET /users/{id} — Buscar usuário por id

PUT /users/{id} — Atualizar usuário

DELETE /users/{id} — Excluir usuário

Pets
GET /pets — Listar pets

POST /pets — Criar pet

PUT /pets/{id} — Atualizar pet

DELETE /pets/{id} — Excluir pet

Agendamentos
GET /appointments — Listar todos agendamentos

POST /appointments — Criar novo agendamento

GET /appointments/{id} — Buscar agendamento por id

PUT /appointments/{id} — Atualizar agendamento

DELETE /appointments/{id} — Excluir agendamento
