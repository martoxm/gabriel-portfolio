export type SkillGroup = {
  id: string
  label: string
  description: string
  items: string[]
}

export type Project = {
  repo: string
  title: string
  description: string
  stack: string[]
  category: "fullstack" | "backend" | "ia" | "frontend"
  highlight?: string
  demo?: string
}

export type TimelineItem = {
  period: string
  title: string
  org: string
  description: string
  tags: string[]
  current?: boolean
  kind: "work" | "education"
}

export type Certification = {
  title: string
  issuer: string
  date: string
  url?: string
}

export const portfolioData = {
  githubUsername: "martoxm",

  hero: {
    name: "Gabriel Martorelli",
    firstName: "Gabriel",
    role: "Desenvolvedor Full Stack Jr.",
    company: "PROVER Soluções em TI",
    status: "Desde set/2026 na PROVER · ERP Prover",
    subtitle:
      "Desenvolvo e mantenho módulos do ERP Prover, do back-end em C# / .NET 10 ao front-end em Next.js e React. Fora do expediente, construo agentes de IA com RAG e automações com n8n — e coloco tudo em produção na nuvem.",
    rotatingWords: ["ERPs", "APIs REST", "agentes de IA", "automações", "interfaces"],
  },

  about: {
    headline: "Do código à produção, com arquitetura que aguenta crescer.",
    paragraphs: [
      "Sou Desenvolvedor Full Stack Jr. na PROVER Soluções em TI e Software House, onde desenvolvo e mantenho módulos do ERP Prover, atuando tanto no back-end quanto no front-end.",
      "No back-end, construo APIs REST em C# / .NET 10 com Clean Architecture, CQRS (MediatR) e DDD, validações com FluentValidation, EF Core com SQL Server, testes unitários e de arquitetura e serviços Azure. No front, interfaces em Next.js e React com TypeScript, Tailwind, shadcn/ui, React Hook Form, Zod e TanStack Query.",
      "Nos últimos meses mergulhei em IA generativa: RAG, embeddings, bancos vetoriais e orquestração de agentes com n8n, LangChain e LangGraph — e levo esses projetos até produção com Docker, Nginx e Oracle Cloud.",
    ],
    stats: [
      { value: "4", label: "certificações em 2026" },
      { value: "4+", label: "anos liderando equipes" },
      { value: "24/7", label: "apps em produção na OCI" },
    ],
  },

  contact: {
    email: "gabriel.martorelli@hotmail.com",
    phone: "+5521972628518",
    phoneLabel: "(21) 97262-8518",
    github: "https://github.com/martoxm",
    linkedin: "https://www.linkedin.com/in/gabrielmartorelli/",
    location: "Rio de Janeiro, RJ · Brasil",
  },

  skillGroups: [
    {
      id: "backend",
      label: "Back-end",
      description: "APIs REST com arquitetura limpa e regras de negócio isoladas.",
      items: [
        "C#",
        ".NET 10",
        "ASP.NET Core",
        "Entity Framework Core",
        "MediatR · CQRS",
        "FluentValidation",
        "Clean Architecture",
        "DDD · SOLID",
        "Testes unitários e de arquitetura",
      ],
    },
    {
      id: "frontend",
      label: "Front-end",
      description: "Interfaces tipadas, responsivas e com boa experiência.",
      items: [
        "React 19",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "React Hook Form · Zod",
        "TanStack Query",
        "TanStack Table",
        "Vite",
      ],
    },
    {
      id: "ia",
      label: "IA & Automação",
      description: "Agentes, RAG e workflows que resolvem problemas reais.",
      items: [
        "RAG",
        "n8n",
        "LangChain",
        "LangGraph",
        "Cohere",
        "Qdrant",
        "Embeddings",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & Dados",
      description: "Do banco à nuvem: Azure no trabalho, OCI nos projetos pessoais.",
      items: [
        "SQL Server",
        "Azure SQL · Blob Storage",
        "MySQL",
        "Docker",
        "Nginx",
        "Oracle Cloud (OCI)",
        "Linux · Systemd",
        "Git & GitHub",
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      repo: "alura-ecommerce-agent",
      title: "Agente de IA para E-commerce",
      description:
        "Assistente corporativo que responde colaboradores com base nos documentos internos da empresa, com memória de contexto. Apresentado na live Show Me Projects da Alura.",
      stack: ["React", "ASP.NET Core", "n8n", "Cohere", "Qdrant", "OCI"],
      category: "ia",
      highlight: "RAG em produção",
      demo: "https://colab.martodev.online",
    },
    {
      repo: "restaurante-estoque",
      title: "Estoque para Restaurante",
      description:
        "Controle de estoque com API em .NET 10 usando CQRS, DDD e MediatR, e front-end em Next.js com Tailwind e shadcn/ui.",
      stack: [".NET 10", "CQRS", "MediatR", "Next.js", "shadcn/ui"],
      category: "fullstack",
      highlight: "Mais recente",
    },
    {
      repo: "crypto-monitor-fullstack",
      title: "Crypto Monitor",
      description:
        "Ecossistema autônomo rodando 24/7: ETL com n8n em Docker, API .NET como daemon Systemd, Nginx como proxy reverso e HTTPS via Certbot.",
      stack: [".NET 10", "DDD", "n8n", "Docker", "Nginx", "OCI"],
      category: "fullstack",
      highlight: "Infra própria",
      demo: "https://crypto-monitor-fullstack.vercel.app",
    },
    {
      repo: "ControleGastos",
      title: "Controle de Gastos",
      description:
        "Desafio técnico full stack com regras de negócio isoladas no domínio, exceções customizadas e use cases organizados por feature.",
      stack: [".NET 10", "EF Core", "React 19", "TypeScript", "Swagger"],
      category: "fullstack",
    },
    {
      repo: "cashflow-api",
      title: "CashFlow API",
      description:
        "API de controle de despesas com arquitetura em camadas, FluentValidation, filtros de exceção e testes de unidade com xUnit.",
      stack: [".NET 10", "EF Core", "MySQL", "xUnit"],
      category: "backend",
    },
    {
      repo: "lading-page-app",
      title: "Landing Page Zingen",
      description:
        "Landing page responsiva com HTML semântico, CSS modular, Grid, Flexbox, CSS Nesting e custom properties.",
      stack: ["HTML", "CSS Nesting", "Grid", "Flexbox"],
      category: "frontend",
      demo: "https://martoxm.github.io/lading-page-app/",
    },
  ] satisfies Project[],

  timeline: [
    {
      period: "Set/2026 — Atual",
      title: "Desenvolvedor Full Stack Jr.",
      org: "PROVER Soluções em TI e Software House",
      description:
        "Desenvolvimento e manutenção de módulos do ERP Prover (remoto). Back-end com APIs REST em C# / .NET 10, Clean Architecture, CQRS (MediatR), DDD, EF Core, SQL Server e Azure. Front-end em Next.js e React com TypeScript, formulários com React Hook Form e Zod, TanStack Query/Table e controle de permissões e acesso.",
      tags: ["C#", ".NET 10", "MediatR", "SQL Server", "Azure", "Next.js", "TanStack Query"],
      current: true,
      kind: "work",
    },
    {
      period: "Jul — Set/2026",
      title: "ONE — Oracle Next Education",
      org: "Alura + Oracle",
      description:
        "Formação em IA e desenvolvimento de software: trilhas de Engenharia de Agentes e Automação com IA (LangChain, LangGraph, n8n) e fundamentos de IA na Oracle Cloud, com a certificação OCI AI Foundations. Projeto apresentado na live Show Me Projects.",
      tags: ["IA", "RAG", "n8n", "LangGraph", "OCI"],
      kind: "education",
    },
    {
      period: "Fev/2026 — Dez/2029",
      title: "Bacharelado em Sistemas de Informação",
      org: "Estácio",
      description:
        "Graduação em andamento, com foco em segurança da informação e computação em nuvem.",
      tags: ["Graduação", "Segurança", "Cloud"],
      kind: "education",
    },
    {
      period: "Dez/2021 — Mai/2026",
      title: "Subgerente · Gestão de Equipe e Processos",
      org: "Sportmix",
      description:
        "Liderança de equipe de vendas, acompanhamento de indicadores e relatórios operacionais, gestão de fornecedores e tomada de decisão sob pressão — base de comunicação e visão de negócio que hoje levo para o desenvolvimento.",
      tags: ["Liderança", "Indicadores", "Processos"],
      kind: "work",
    },
  ] satisfies TimelineItem[],

  certifications: [
    {
      title: "OCI Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "set. 2026",
    },
    {
      title: "Engenharia de Agentes e Automação com IA",
      issuer: "Alura · ONE AI for Tech",
      date: "jul. 2026",
    },
    {
      title: "Banco de Dados SQL do Zero ao Avançado",
      issuer: "Udemy",
      date: "jun. 2026",
    },
    {
      title: "Foundational C# with Microsoft",
      issuer: "freeCodeCamp",
      date: "jun. 2026",
    },
  ] satisfies Certification[],

  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Básico a intermediário" },
  ],
}
