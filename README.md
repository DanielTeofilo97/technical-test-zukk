<h1 align="center">
    🔐 API Rest Teste Técnico Zukk - Rural Management Backend
</h1>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-funcionalidades">Funcionalidades do Projeto</a> •
 <a href="#-emails">Emails</a> •
 <a href="#-pastas">Estrutura de Pastas</a> •
 <a href="#-script">Scripts</a> •
 <a href="#-db">Banco de Dados</a> •
 <a href="#-v-ambiente">Variáveis de Ambiente</a> •
 <a href="#-designer-system">Designer System</a> •
 <a href="#-tests">Testes</a> • •
 <a href="#-solid">Princípios SOLID</a> •
 <a href="#-auth">Porque o AuthJs</a> •
 <a href="#-contribuir">Contribuições</a> •
 <a href="#-autor">Autor</a> •
 <a href="#-licença">Licença</a>
</p>

&nbsp;
<a id="-sobre-o-projeto"></a>

## 💻 Sobre o projeto

&nbsp;

O **Rural Management Backend** é uma solução escalável e robusta, projetada para gerenciar dados de produtores rurais e suas fazendas. Focado na eficiência e segurança, o projeto utiliza Node.js com PostgreSQL para armazenar informações como produtores, áreas de fazendas, culturas plantadas e distribuições regionais.

O sistema valida rigorosamente CPF e CNPJ e assegura que a soma das áreas agricultáveis e de vegetação nunca ultrapasse a área total da fazenda. A API oferece endpoints para cadastrar, editar e excluir produtores, além de fornecer dados consolidados para um dashboard, que inclui métricas como total de fazendas, área total em hectares e gráficos de pizza para visualizar distribuição por estado, cultura e uso de solo.

Com uma arquitetura baseada em princípios SOLID e boas práticas de desenvolvimento, o backend garante extensibilidade e manutenibilidade. A integração de testes unitários e o uso de TypeScript reforçam a confiabilidade do código, promovendo uma solução ágil e escalável para a gestão de propriedades rurais.

&nbsp;
<a id="-tecnologias"></a>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto

&nbsp;

<p align="center">
  <!-- <a href= ""><img alt="" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=ECD53F&logo=.ENV&label=Managing Environment Variables&message=.ENV&color=ECD53F"></a> -->
  <a href= "https://nodejs.org/en/" target="_blank" rel="noopener noreferrer"><img alt="Node.js badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/nodejs-badge.svg"></a>
  <a href= "https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/typescript-badge.svg"></a>
  <a href= "https://www.javascript.com/" target="_blank" rel="noopener noreferrer"><img alt="JavaScript badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/javascript-badge.svg"></a>
  <a href= "https://www.dotenv.org/" target="_blank" rel="noopener noreferrer"><img alt="Dotenv badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/dotenv-badge.svg"></a>
  <a href= "https://www.docker.com/"><img alt="Docker badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/docker-badge.svg"></a>
  <a href= "https://jwt.io/"><img alt="JSON Web Tokens Badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/jwt-badge.svg"></a>
  <a href= "https://jestjs.io/pt-BR/"><img alt="badge github actions" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/jest-badge.svg"></a>
  <a href= "https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer"><img alt="vscode download" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/vsCode-badge.svg"></a>
  <a href= "https://prettier.io/" target="_blank" rel="noopener noreferrer"><img alt="code formatter prettier" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/prettier-badge.svg"></a>
  <a href= "https://eslint.org/" target="_blank" rel="noopener noreferrer"><img alt="code standardization eslint" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/eslint-badge.svg"></a>
  <a>
  <img src='https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white'>
  </a>
</p>

&nbsp;
<a id="-funcionalidades"></a>

## ⚙️ Funcionalidades do Projeto e Recursos Avançados

O **Rural Management Backend** oferece uma série de funcionalidades essenciais como autenticação, gestão de dados, controle por permissão:

## Auth

O `Auth` é o ponto de entrada da API para operações relacionadas à autenticação, permitindo que os usuários façam login e se registrem na aplicação. Este controlador utiliza o `AuthService` para realizar as operações de autenticação e está documentado usando decorators do Swagger para gerar a documentação automática da API.

### Funções:

- **login(@Body() { cpf, password }: AuthLoginDTO):**  
  Rota: `POST /auth/login`  
  Permite que um usuário faça login na aplicação utilizando CPF e senha. Se as credenciais forem válidas, o usuário receberá um token JWT.  
  - **Código de resposta:** 200 (Sucesso)  
  - **Código de resposta:** 400 (Erro ao fazer login)

- **register(@Body() body: AuthRegisterDTO):**  
  Rota: `POST /auth/register`  
  Permite que um novo usuário se registre na aplicação fornecendo CPF, senha, e outros detalhes no corpo da requisição. Após o cadastro, o usuário receberá um token JWT.  
  - **Código de resposta:** 200 (Sucesso)  
  - **Código de resposta:** 400 (Erro ao fazer cadastro)

### Decorators Swagger:

- **@ApiOperation:** Fornece uma breve descrição de cada operação (login, registro) para gerar documentação detalhada.
- **@ApiResponse:** Especifica os códigos de resposta possíveis para cada operação, juntamente com uma descrição do resultado esperado.
- **@ApiTags:** Classifica este controlador sob a tag `auth` na documentação Swagger.

---

## Culture

O `Culture` gerencia as operações relacionadas às culturas na aplicação. Ele utiliza o `CultureService` para realizar as operações de CRUD e inclui controles de acesso para garantir que apenas usuários com as permissões apropriadas possam acessar determinadas rotas. A documentação Swagger é utilizada para gerar uma documentação detalhada da API.

### Funções:

- **create(@Body() data: CreateCultureDTO, @Req() req):**  
  Rota: `POST /cultures`  
  Permite que um usuário com a função de Admin crie uma nova cultura. O usuário deve fornecer os detalhes da cultura no corpo da requisição.  
  - **Código de resposta:** 201 (Cultura criada com sucesso)  
  - **Código de resposta:** 400 (Erro durante a criação da cultura)  
  - **Código de resposta:** 409 (Cultura já cadastrada)  
  - **Código de resposta:** 403 (Usuário não tem acesso ao recurso)

- **read(@Query('skip') skip: string, @Query('take') take: string, @Query('nome') nome?: string):**  
  Rota: `GET /cultures`  
  Retorna uma lista de culturas com a possibilidade de aplicar filtros e paginação. Os parâmetros de consulta `skip`, `take`, e `nome` podem ser utilizados para ajustar a busca.  
  - **Código de resposta:** 200 (Listagem de culturas)  
  - **Código de resposta:** 404 (Nenhuma cultura encontrada)  
  - **Código de resposta:** 400 (Erro ao buscar culturas)

- **delete(@Param('id', ParseUUIDPipe) id: string):**  
  Rota: `DELETE /cultures/:id`  
  Permite que um usuário com a função de Admin desabilite (delete) uma cultura existente usando o ID da cultura.  
  - **Código de resposta:** 200 (Cultura desabilitada com sucesso)  
  - **Código de resposta:** 404 (Cultura não encontrada)  
  - **Código de resposta:** 403 (Usuário não tem acesso ao recurso)

### Decorators Swagger:

- **@ApiBearerAuth:** Indica que a autenticação é necessária para acessar as rotas e que um token Bearer deve ser fornecido.
- **@ApiHeader:** Adiciona informações sobre o header `Authorization` que deve conter o token Bearer.
- **@Roles:** Define que a rota pode ser acessada apenas por usuários com o papel especificado (Admin).
- **@UseGuards:** Aplica os guards `AuthGuard` e `RoleGuard` para controlar o acesso às rotas.
- **@ApiOperation:** Fornece uma breve descrição de cada operação (criação, listagem, exclusão) para gerar documentação detalhada.
- **@ApiResponse:** Especifica os códigos de resposta possíveis para cada operação, juntamente com uma descrição do resultado esperado.
- **@ApiTags:** Classifica este controlador sob a tag `cultures` na documentação Swagger.

---
## Metric

O `Metric` gerencia as operações relacionadas à coleta e exibição de métricas na aplicação. Ele utiliza o `MetricService` para obter os dados das métricas e inclui controle de acesso para garantir que apenas usuários com as permissões apropriadas possam acessar a rota. A documentação Swagger é utilizada para gerar uma documentação detalhada da API.

### Funções:

- **read():**  
  Rota: `GET /metrics`  
  Retorna uma lista de métricas relacionadas às fazendas. A operação é protegida por autenticação e autorização, exigindo que o usuário tenha o papel de Admin para acessar os dados.  
  - **Código de resposta:** 200 (Listagem de métricas com sucesso)  
  - **Código de resposta:** 404 (Nenhuma métrica encontrada)  
  - **Código de resposta:** 400 (Erro ao buscar métricas)

### Decorators Swagger:

- **@ApiBearerAuth:** Indica que a autenticação é necessária para acessar a rota e que um token Bearer deve ser fornecido.
- **@ApiHeader:** Adiciona informações sobre o header `Authorization` que deve conter o token Bearer.
- **@Roles:** Define que a rota pode ser acessada apenas por usuários com o papel especificado (Admin).
- **@UseGuards:** Aplica os guards `AuthGuard` e `RoleGuard` para controlar o acesso à rota.
- **@ApiOperation:** Fornece uma breve descrição da operação para gerar documentação detalhada.
- **@ApiResponse:** Especifica os códigos de resposta possíveis para a operação, juntamente com uma descrição do resultado esperado.
- **@ApiTags:** Classifica este controlador sob a tag `metrics` na documentação Swagger.

---

## Postman

O `Postman` gerencia a rota para o download de uma coleção do Postman, permitindo que os desenvolvedores obtenham uma cópia da coleção de testes da API em formato JSON. Este controlador fornece um endpoint específico para acessar o arquivo de coleção do Postman armazenado publicamente no servidor.

### Funções:

- **downloadPostmanCollection(@Res() res: Response):**  
  Rota: `GET /postman/collection`  
  Permite que os desenvolvedores baixem a coleção do Postman para testes da API. O arquivo é retornado no formato JSON e é enviado ao cliente com o nome `api-vehicles.postman_collection.json`.  
  - **Código de resposta:** 200 (Arquivo baixado com sucesso)  
  - **Código de resposta:** 404 (Arquivo não encontrado)

### Decorators Swagger:

- **@ApiTags:** Classifica este controlador sob a tag `postman` na documentação Swagger.

---

## Producer

O `Producer` gerencia as rotas para operações relacionadas aos produtores. Ele permite a criação, atualização, listagem e exclusão de produtores. O controlador utiliza o `ProducerService` para realizar essas operações e está documentado com os decorators do Swagger para gerar a documentação automática da API.

### Funções:

- **create(@Body() data: CreateProducerDTO, @Req() req):**  
  Rota: `POST /producers`  
  Permite a criação de um novo produtor com base nos dados fornecidos. O produtor é associado ao ID do usuário que realizou a requisição.  
  - **Código de resposta:** 201 (Produtor criado com sucesso)  
  - **Código de resposta:** 400 (Erro durante a criação do produtor)  
  - **Código de resposta:** 409 (Produtor já cadastrado)  
  - **Código de resposta:** 403 (Usuário não tem acesso ao recurso)

- **read(@Query() query):**  
  Rota: `GET /producers`  
  Permite listar produtores com base em parâmetros de consulta opcionais, como CPF/CNPJ, nome do produtor, nome da fazenda, cidade e estado.  
  - **Código de resposta:** 200 (Listagem de produtores)  
  - **Código de resposta:** 404 (Nenhum produtor encontrado)  
  - **Código de resposta:** 400 (Erro ao buscar produtores)

- **update(@Body() data: UpdateProducerDTO, @Param('id', ParseUUIDPipe) id: string, @Req() req):**  
  Rota: `PUT /producers/:id`  
  Permite a atualização de um produtor existente com base no ID fornecido. O produtor é atualizado com os dados fornecidos e associado ao ID do usuário que realizou a requisição.  
  - **Código de resposta:** 200 (Produtor atualizado com sucesso)  
  - **Código de resposta:** 404 (Produtor não encontrado)

- **delete(@Param('id', ParseUUIDPipe) id: string):**  
  Rota: `DELETE /producers/:id`  
  Permite a exclusão de um produtor com base no ID fornecido.  
  - **Código de resposta:** 200 (Produtor desabilitado com sucesso)  
  - **Código de resposta:** 404 (Produtor não encontrado)  
  - **Código de resposta:** 403 (Usuário não tem acesso ao recurso)

### Decorators Swagger:

- **@ApiBearerAuth:** Indica que o endpoint requer autenticação com token Bearer.
- **@ApiHeader:** Adiciona informações sobre o header de autorização para a documentação.
- **@Roles:** Define o papel necessário para acessar os endpoints.
- **@UseGuards:** Aplica guardas de autenticação e autorização.
- **@ApiOperation:** Fornece uma descrição breve de cada operação (criação, leitura, atualização, exclusão).
- **@ApiResponse:** Especifica os códigos de resposta possíveis para cada operação, com descrições dos resultados esperados.
- **@ApiTags:** Classifica este controlador sob a tag `producers` na documentação Swagger.
- **@ApiQuery:** Documenta os parâmetros de consulta opcionais para a listagem de produtores.

---

## User

O `User` gerencia as rotas para operações relacionadas aos usuários. Ele permite criar, listar, buscar, atualizar (total e parcialmente) e excluir usuários. O controlador utiliza o `UserService` para realizar essas operações e está documentado com os decorators do Swagger para gerar a documentação automática da API.

### Funções:

- **create(@Body() data: CreateUserDTO):**  
  Rota: `POST /users`  
  Permite a criação de um novo usuário com base nos dados fornecidos.  
  - **Código de resposta:** 201 (Usuário criado com sucesso)  
  - **Código de resposta:** 400 (Erro durante a criação do usuário)

- **read():**  
  Rota: `GET /users`  
  Permite listar todos os usuários.  
  - **Código de resposta:** 200 (Listagem de usuários)  
  - **Código de resposta:** 404 (Nenhum usuário encontrado)  
  - **Código de resposta:** 400 (Erro ao buscar usuários)

- **readOne(@Param('id', ParseUUIDPipe) id: string):**  
  Rota: `GET /users/:id`  
  Permite buscar um usuário específico pelo ID fornecido.  
  - **Código de resposta:** 200 (Usuário encontrado)  
  - **Código de resposta:** 404 (Usuário não encontrado)

- **update(@Body() data: UpdateUserDTO, @Param('id', ParseUUIDPipe) id: string):**  
  Rota: `PUT /users/:id`  
  Permite atualizar um usuário existente com base no ID fornecido.  
  - **Código de resposta:** 200 (Usuário atualizado com sucesso)  
  - **Código de resposta:** 404 (Usuário não encontrado)

- **updatePartial(@Body() data: PatchUserDTO, @Param('id', ParseUUIDPipe) id: string):**  
  Rota: `PATCH /users/:id`  
  Permite atualizar parcialmente um usuário existente com base no ID fornecido.  
  - **Código de resposta:** 200 (Usuário parcialmente atualizado com sucesso)  
  - **Código de resposta:** 404 (Usuário não encontrado)

- **delete(@Param('id', ParseUUIDPipe) id: string):**  
  Rota: `DELETE /users/:id`  
  Permite excluir um usuário com base no ID fornecido.  
  - **Código de resposta:** 200 (Usuário desabilitado com sucesso)  
  - **Código de resposta:** 404 (Usuário não encontrado)

### Decorators Swagger:

- **@ApiBearerAuth:** Indica que o endpoint requer autenticação com token Bearer.
- **@ApiHeader:** Adiciona informações sobre o header de autorização para a documentação.
- **@Roles:** Define o papel necessário para acessar os endpoints.
- **@UseGuards:** Aplica guardas de autenticação e autorização.
- **@ApiOperation:** Fornece uma descrição breve de cada operação (criação, listagem, busca, atualização, exclusão).
- **@ApiResponse:** Especifica os códigos de resposta possíveis para cada operação, com descrições dos resultados esperados.
- **@ApiTags:** Classifica este controlador sob a tag `users` na documentação Swagger.

---