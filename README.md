# 🤍 Site Institucional: Instituto AbraceRS v2

![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwindcss&logoColor=white)
![Contexto](https://img.shields.io/badge/Contexto-Freelance-blueviolet)
![Status](https://img.shields.io/badge/Status-Em%20andamento-yellow)

Redesenho do site institucional do **Instituto AbraceRS**, desenvolvido como trabalho freelancer. A v2 mantém a proposta de um produto completo (vitrine pública + gestão de conteúdo), com arquitetura mais madura, visual renovado e foco em performance, incluindo renderização no servidor (SSR).

---

## 🎯 Objetivo do Projeto

Entregar uma nova versão do site institucional mais escalável, organizada e polida. A aplicação é estruturada por features, com tipagem forte, integração ao Supabase e atenção especial à experiência do visitante e à autonomia da equipe administrativa na gestão do conteúdo.

---

## 🚀 Funcionalidades

O sistema cobre a presença institucional e a administração do conteúdo:

1. **Site institucional multipágina (SPA + SSR):** Home, Quem Somos, Como Atuamos, Blog e Junte-se, com rotas públicas prerenderizadas/servidas no servidor quando fizer sentido.
2. **Projetos e posts dinâmicos:** Listagem, detalhe e conteúdo gerenciado via Supabase, com galerias e mídia no Storage.
3. **Área administrativa protegida:** Login com autenticação Supabase e rotas protegidas por `authGuard`.
4. **CRUD ampliado:** Gestão de posts, projetos, apoiadores (supporters) e membros da equipe.
5. **Editor rico:** Conteúdo formatado com Quill (`ngx-quill`) nos formulários administrativos.
6. **Cadastros de engajamento:** Fluxo de associado e voluntário, com visão administrativa dos registros recebidos.
7. **Seções de conversão:** Hero, doação, associação e destaques de conteúdo na Home.

---

## 🛠️ Tecnologias Utilizadas

* **Angular (v22):** Framework Front-end com roteamento, componentes standalone e organização por features.
* **Angular SSR:** Renderização no servidor (e prerender) para melhorar performance e SEO das páginas públicas.
* **TypeScript:** Tipagem estática em toda a aplicação.
* **Supabase:** Autenticação, banco de dados (PostgreSQL) e armazenamento de imagens.
* **Tailwind CSS (v4):** Estilização utilitária para o layout e a identidade visual.
* **Quill (`ngx-quill`):** Editor de texto rico na área administrativa.
* **Font Awesome:** Ícones na interface pública e administrativa.
* **RxJS:** Fluxos reativos, incluindo o estado de autenticação.

---

## 🧠 Conceitos Aplicados

* **Arquitetura por features:** Organização em `core`, `features` e `shared`, separando domínio, infraestrutura e componentes reutilizáveis.
* **SSR e Render Modes:** Configuração de rotas com renderização no servidor, no cliente ou prerender conforme o tipo de página (pública vs. admin).
* **Autenticação e autorização:** Supabase Auth + `authGuard` para proteger as rotas administrativas.
* **CRUD com Storage:** Persistência de conteúdo e upload/remoção de imagens em buckets do Supabase.
* **Formulários reativos:** Validação e fluxo de criação/edição nos formulários admin e de cadastro.
* **Componentização:** Blocos reutilizáveis (header, footer, galeria, seções da Home e da Quem Somos) para manter o código modular.
* **Design system com Tailwind:** Identidade visual consistente via utilitários e estilos compartilhados.
