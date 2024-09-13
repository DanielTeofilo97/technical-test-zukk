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
  <a href= "https://nextjs.org/" target="_blank" rel="noopener noreferrer"><img alt="NextJs badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/nextjs-badge.svg"></a>
  <a href= "https://pt-br.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer"><img alt="ReactJs badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/react-badge.svg"></a>
  <a href= "https://react-hook-form.com/" target="_blank" rel="noopener noreferrer"><img alt="React Hook Form badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/reactHookForm-badge.svg"></a>
  <a href= "https://html5.org/"><img alt="HTML5 badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/html-badge.svg"></a>
  <a href= "https://www.w3.org/Style/CSS/Overview.en.html"><img alt="CSS badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/css-badge.svg"></a>
  <a href= "https://tailwindcss.com/"><img alt="Tailwindcss badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/tailwindcss-badge.svg"></a>
  <a href= "https://www.radix-ui.com/"><img alt="Radix Ui badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/radix-ui-badge.svg"></a>
  <a href= "https://ui.shadcn.com/"><img alt="Shadcn Ui badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/shadcnui-badge.svg"></a>
  <a href= "https://zod.dev/" target="_blank" rel="noopener noreferrer"><img alt="ZOD badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/zod-badge.svg"></a>
  <a href= "https://www.dotenv.org/" target="_blank" rel="noopener noreferrer"><img alt="Dotenv badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/dotenv-badge.svg"></a>
  <a href= "https://www.docker.com/"><img alt="Docker badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/docker-badge.svg"></a>
  <a href= "https://jwt.io/"><img alt="JSON Web Tokens Badge" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/jwt-badge.svg"></a>
  <a href= "https://github.com/LivioAlvarenga/auth-portfolio-platform/actions"><img alt="badge github actions" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/github-actions-badge.svg"></a>
  <a href= "https://jestjs.io/pt-BR/"><img alt="badge github actions" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/jest-badge.svg"></a>
  <a href= "https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer"><img alt="vscode download" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/vsCode-badge.svg"></a>
  <a href= "https://prettier.io/" target="_blank" rel="noopener noreferrer"><img alt="code formatter prettier" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/prettier-badge.svg"></a>
  <a href= "https://eslint.org/" target="_blank" rel="noopener noreferrer"><img alt="code standardization eslint" src="https://chpfldfxmaovtlouzcwg.supabase.co/storage/v1/object/public/assets-public/images/readme/eslint-badge.svg"></a>
</p>
