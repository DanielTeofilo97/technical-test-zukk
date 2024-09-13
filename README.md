<h1 align="center">
    🔐 API Rest Teste Técnico Zukk - Rural Management Backend
</h1>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-funcionalidades">Funcionalidades do Projeto</a> •
 <a href="#-pastas">Estrutura de Pastas</a> •
 <a href="#-script">Scripts</a> •
 <a href="#-db">Banco de Dados</a> •
 <a href="#-v-ambiente">Variáveis de Ambiente</a> •
 <a href="#-tests">Testes</a> • •
 <a href="#-solid">Princípios SOLID</a> •
 <a href="#-contribuir">Contribuições</a> •
 <a href="#-autor">Autor</a> •
 <a href="#-licença">Licença</a>
</p>

&nbsp;
<a id="-sobre-o-projeto"></a>

## 💻 Sobre o projeto
&nbsp;
<img src="https://gerfzmyuurqmcfozugab.supabase.co/storage/v1/object/public/fotos/swagger%20(1).png?t=2024-09-13T18%3A03%3A28.341Z" alt="Tela de Login - Auth Portfolio Platform" align="center" />
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
&nbsp;

<a id="-pastas"></a>

## 📁 Estrutura de Pastas

O projeto segue a arquitetura modular do NestJS, com a estrutura abaixo organizada para facilitar a manutenção e escalabilidade. Abaixo está uma visão geral das principais pastas e seus propósitos:

- **decorators**: Contém decorators personalizados que são usados para adicionar metadados e funcionalidades aos elementos do código.

- **enums**: Armazena enums que definem conjuntos de constantes nomeadas usadas em todo o projeto.

- **guards**: Inclui guardas que implementam a lógica de autorização e autenticação para proteger as rotas e recursos da aplicação.

- **interceptors**: Contém interceptadores que permitem modificar ou manipular a solicitação e a resposta em diferentes pontos da execução.

- **middlewares**: Armazena middlewares que processam solicitações e respostas antes que elas cheguem aos controladores ou após saírem dos controladores.

- **modules**: Organiza os módulos que encapsulam funcionalidades específicas da aplicação e sua configuração.

- **prisma**: Contém a configuração e os arquivos relacionados ao Prisma ORM, incluindo esquemas e migrações para a camada de dados. O módulo de conexão com o banco de dados está incluído aqui.

- **utils**: Contém funções utilitárias e helpers que facilitam tarefas comuns em diversas partes do projeto.

Além dessas pastas dentro de `src`, o projeto também possui outros diretórios e arquivos na raiz, como configurações do ESLint, Prettier, Docker, e o `.env` para variáveis de ambiente.

Essa organização modular segue as melhores práticas de desenvolvimento, facilitando a manutenção, a escalabilidade e a colaboração no projeto.

&nbsp;
<a id="-db"></a>

## 🗄️ Banco de Dados

Neste projeto, utilizamos **PostgreSQL** como nosso banco de dados principal devido à sua robustez, escalabilidade e suporte avançado a funcionalidades como transações, índices e operações complexas. A comunicação com o banco de dados é feita através do **Prisma ORM**, que facilita o gerenciamento de dados e a interação com o banco de dados.

### Uso do Prisma

O **Prisma** é utilizado para simplificar o acesso e manipulação dos dados no PostgreSQL. Ele fornece um ORM poderoso que nos permite definir modelos de dados de forma intuitiva e realizar operações complexas de forma eficiente. Além disso, Prisma suporta SQL puro para consultas específicas, oferecendo flexibilidade para otimizar consultas conforme necessário e aproveitar funcionalidades avançadas do PostgreSQL.

### Estrutura de Repositórios e SOLID

A estrutura de repositórios foi projetada seguindo os princípios SOLID, particularmente o Princípio da Inversão de Dependência (Dependency Inversion Principle). Dentro do diretório de repositórios (`repositories`), temos implementações específicas para o PostgreSQL usando o Prisma, que seguem as interfaces definidas para cada entidade. Essa abordagem permite que o sistema seja flexível e fácil de manter. Se decidirmos trocar o banco de dados no futuro, podemos fazer isso implementando novos repositórios sem alterar o restante da aplicação.

### SQL Puro vs. ORM

Optamos por utilizar o **Prisma ORM** para a maioria das operações de banco de dados, aproveitando suas funcionalidades para simplificar o desenvolvimento e manutenção. No entanto, também utilizamos **SQL puro** para consultas específicas que exigem maior controle e otimização. Essa combinação nos permite aproveitar o melhor dos dois mundos: a facilidade do ORM para operações comuns e a flexibilidade do SQL puro para consultas complexas e personalizadas.

### Personalização das Entidades

As entidades no projeto seguem o padrão utilizado pelo Prisma, mas foram personalizadas para atender às necessidades específicas da aplicação. Isso inclui a implementação de funcionalidades adicionais e ajustes que garantem uma integração perfeita com nosso sistema de autenticação personalizado.

&nbsp;

&nbsp;
<a id="-v-ambiente"></a>

## 🔐 Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para gerenciar configurações sensíveis e específicas de cada ambiente (desenvolvimento, staging, produção). Essas variáveis são armazenadas em arquivos `.env`, que permitem a configuração e o comportamento adequado da aplicação em diferentes contextos.

### Arquivo `.env`

No ambiente de desenvolvimento, utilizamos o arquivo `.env`, que contém variáveis que não apresentam riscos de segurança e são necessárias para que a aplicação funcione localmente. Esse arquivo é incluído no repositório para que todos os desenvolvedores possam facilmente configurar e executar a aplicação em suas máquinas. As variáveis configuram, por exemplo, a conexão com o banco de dados PostgreSQL local, o segredo de autenticação, o tempo de duração da sessão, entre outras. No ambiente de produção, essas variáveis são preenchidas com dados reais e sensíveis, que não são compartilhados no repositório.

### Arquivo `.env.example`

O arquivo `.env.example` serve como um guia para os desenvolvedores que precisam configurar suas próprias variáveis de ambiente locais. Ele lista todas as variáveis necessárias, mas sem os valores sensíveis, que devem ser preenchidos por cada desenvolvedor. 

&nbsp;
<a id="-tests"></a>

## 🧪 Testes

Os testes desempenham um papel crucial na qualidade e robustez deste projeto. Adotamos uma abordagem de **Test-Driven Development (TDD)** em várias APIs, onde os testes são escritos antes mesmo de começar a implementação, garantindo que as funcionalidades sejam desenvolvidas de acordo com as expectativas desde o início.

<img src="https://gerfzmyuurqmcfozugab.supabase.co/storage/v1/object/public/fotos/testes.png" alt="Resultados de test do Rural Management Backend" align="center" />

### Tipos de Testes

- **Testes de Integração**: Em nossos testes de integração, testamos os casos de uso completos, desde a API até o final do caso de uso. Isso garante que todas as partes do sistema estejam funcionando de maneira coesa, integrando corretamente os diferentes componentes e verificando que a lógica de negócios está sendo executada conforme o esperado.

- **Testes Unitários**: Nos testes unitários, focamos em validar partes isoladas do código, como utilidades e schemas de sanitização usando Jest.

### Ferramentas e Integração Contínua

- **Jest**: Atualmente, utilizamos o **Jest** como nossa principal ferramenta de testes, aproveitando sua ampla adoção e robustez para garantir a qualidade do código. O Jest permite criar e executar tanto testes unitários quanto de integração de maneira eficiente.
  

&nbsp;
<a id="-ci"></a>

## 🚀 CI/CD (Integração e Entrega Contínuas)

Neste projeto, adotamos uma abordagem rigorosa e padronizada para **CI/CD** (Integração e Entrega Contínuas), garantindo que o código seja sempre de alta qualidade antes de ser mesclado e implantado em produção.

### Validação e Qualidade do Código

Utilizamos ferramentas para garantir a qualidade do código durante o processo de integração contínua:

1. **ESLint**: Rodamos `npm run lint:eslint:check` para verificar a conformidade do código com as regras de lint definidas. O código precisa passar nessa verificação antes de ser integrado.

2. **Prettier**: Usamos `npm run lint:prettier:check` para garantir que o código está formatado corretamente de acordo com as regras do Prettier. O código deve estar formatado corretamente antes de ser integrado.

3. **Testes Automatizados**: Todos os testes são executados automaticamente para garantir que o código esteja funcionando conforme o esperado. Somente após a aprovação em todos os testes, o código é integrado.

Exemplos de tipos de commits que utilizamos:

- **feat**: Um novo recurso adicionado ao projeto
- **fix**: Correção de um bug no projeto
- **build**: Alterações no sistema de build ou em dependências externas (ex: gulp, npm)
- **chore**: Tarefas que não alteram o código de produção (ex: atualizações de dependências)
- **ci**: Alterações em arquivos de configuração e scripts de CI (ex: Travis, CircleCI)
- **docs**: Alterações que afetam apenas a documentação
- **style**: Alterações de estilo que não afetam o significado do código (ex: formatação)
- **refactor**: Mudanças no código que não adicionam recursos ou corrigem bugs
- **perf**: Alterações no código que melhoram o desempenho
- **test**: Adição ou correção de testes
  
### Estratégia de Branching

Optamos por uma estratégia de branching simples, onde cada nova funcionalidade é desenvolvida em uma branch específica para aquela feature. Essa estratégia é conhecida como **Feature Branching**, que não deve ser confundida com o Git Flow. Embora o Git Flow seja uma excelente estratégia, optamos pela simplicidade do Feature Branching.

Além das feature branches, mantemos uma branch fixa para ajustes rápidos, garantindo que correções urgentes possam ser aplicadas rapidamente.

### Deploy com Railway

O deploy do projeto é realizado automaticamente na **Railway**, uma plataforma que facilita o processo de entrega contínua. A Railway é otimizada para gerenciamento de infraestrutura e implantação, garantindo que as mudanças aprovadas na branch principal sejam implantadas rapidamente e de forma eficiente.

### Conclusão

Com essa estrutura de CI/CD bem definida, conseguimos manter um alto padrão de qualidade no código e nos processos de desenvolvimento, minimizando a possibilidade de erros e garantindo a estabilidade e a escalabilidade do projeto.


&nbsp;
<a id="-solid"></a>

## 🧩 Princípios SOLID no Projeto

Os princípios SOLID são fundamentais para criar sistemas escaláveis, fáceis de manter e com baixo acoplamento. A seguir, detalharemos como cada um desses princípios foi aplicado na arquitetura do projeto utilizando NestJS.

### 1. **Princípio da Responsabilidade Única (SRP - Single Responsibility Principle)**

**Aplicação no Projeto:**

- **Controllers**: Em NestJS, os controllers são responsáveis apenas por receber as requisições e delegar a lógica de negócios para os serviços. Eles não lidam com a lógica de negócios ou acesso direto ao banco de dados.

  Exemplo: `UserController` lida com endpoints de usuários e delega a lógica de manipulação de dados ao `UserService`.

- **Services**: Serviços são responsáveis pela lógica de negócios e interações com o banco de dados. Eles encapsulam a lógica de domínio e são chamados pelos controllers.

  Exemplo: `UserService` implementa a lógica para criação, atualização e exclusão de usuários.

- **Repositories**: Utilizamos o Prisma ou o TypeORM para abstrair o acesso ao banco de dados. Esses módulos fornecem um repositório abstrato para realizar operações CRUD e abstrair a lógica de acesso ao banco de dados.

  Exemplo: `UserRepository` gerencia operações de CRUD para a entidade `User`.

**Benefício**: Cada componente tem uma responsabilidade claramente definida, o que facilita a manutenção e a evolução do código sem introduzir efeitos colaterais indesejados.

### 2. **Princípio do Aberto/Fechado (OCP - Open/Closed Principle)**

**Aplicação no Projeto:**

- **Services e Repositories**: Os serviços e repositórios são projetados para serem extensíveis sem modificar o código existente. Novas funcionalidades podem ser adicionadas criando novas classes ou implementações.

  Exemplo: Adicionar uma nova funcionalidade ao `UserService` não requer alterações na lógica existente, mas a adição de novos métodos ou serviços.

- **Modules**: Os módulos do NestJS são configuráveis e podem ser estendidos com novos providers ou controllers sem alterar o código existente.

  Exemplo: Adicionar um novo módulo para uma nova funcionalidade não afeta os módulos existentes.

**Benefício**: O sistema é extensível sem necessidade de modificar o código existente, reduzindo a probabilidade de introduzir bugs e facilitando a adição de novas funcionalidades.

### 3. **Princípio da Substituição de Liskov (LSP - Liskov Substitution Principle)**

**Aplicação no Projeto:**

- **Interfaces de Repositories**: As interfaces definidas para os repositórios garantem que qualquer implementação concreta possa ser substituída por outra implementação sem quebrar o código que depende dela.

  Exemplo: `UserRepository` pode ser substituído por uma implementação que use MongoDB sem impactar o `UserService`.

**Benefício**: Facilita a troca e a substituição de componentes do sistema sem alterações significativas no código que os utiliza, mantendo a compatibilidade e a previsibilidade do comportamento do sistema.

### 4. **Princípio da Segregação de Interfaces (ISP - Interface Segregation Principle)**

**Aplicação no Projeto:**

- **Interfaces Específicas**: Cada repositório e serviço implementa interfaces específicas para as operações necessárias, evitando a implementação de métodos que não são utilizados.

  Exemplo: `UserRepository` define apenas métodos relacionados a usuários, sem incluir métodos para outras entidades.

**Benefício**: As classes e interfaces são mantidas pequenas e focadas, o que torna o código mais limpo e fácil de entender.

### 5. **Princípio da Inversão de Dependência (DIP - Dependency Inversion Principle)**

**Aplicação no Projeto:**

- **Dependency Injection**: O NestJS usa injeção de dependência para fornecer implementações para as interfaces, permitindo que o código de alto nível dependa de abstrações e não de implementações concretas.

  Exemplo: `UserService` depende de uma abstração `UserRepository`, que é injetada via construtor.

- **Factories e Modules**: As factories e módulos gerenciam a criação e injeção de dependências, permitindo que o sistema seja modular e desacoplado.

  Exemplo: `UserModule` configura e fornece a implementação do `UserRepository` e do `UserService`.

**Benefício**: Facilita o teste unitário e a substituição de componentes por mocks ou outras implementações, promovendo a criação de código mais modular e desacoplado.

---

&nbsp;
<a id="--contribuir"></a>

## 👐 Contribuições

Este projeto é open source sob a licença MIT, e contribuições são muito bem-vindas!

Se você encontrar algum problema ou tiver uma ideia de melhoria, sinta-se à vontade para abrir uma [issue](https://github.com/seu_usuario/seu_repositorio/issues). Pull requests também são muito bem-vindos!

Por favor, siga as diretrizes descritas no [CONTRIBUTING.md](./CONTRIBUTING.md) para garantir que o processo de contribuição seja o mais suave possível.

### Código de Conduta

Este projeto segue um [Código de Conduta](./CODE_OF_CONDUCT.md). Ao participar, você está concordando em seguir essas diretrizes.

&nbsp;
<a id="-autor"></a>

## 🦸 Autor

Olá, eu sou Daniel Teófilo, Analista de Sistenas. Sou aficcionado por tecnologia, programação e processos.  Dúvidas, sugestões e críticas são super bem vindas. Seguem meus contatos.

- feitordaniel@live.com

&nbsp;

<p align="center">
  <a href= "https://br.linkedin.com/in/daniel-te%C3%B3filo-108a0222b"><img alt="perfil Daniel Teófilo da Silva" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=0A66C2&logo=LinkedIn&label=LinkedIn&message=Daniel Teófilo&color=0A66C2"></a>
  <a href= "https://www.instagram.com/daniel.teofilos/"><img alt="perfil Instagram Daniel Teófilo" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=E4405F&logo=Instagram&label=Instagram&message=@daniel.teofilos&color=E4405F"></a>
</p>


---

&nbsp;
<a id="-licença"></a>

## 📝 Licença

Este projeto é [MIT licensed](./LICENSE).

##### _#CompartilheConhecimento_
