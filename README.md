# AgroData 🌾

**AgroData** é um dashboard financeiro moderno e interativo desenvolvido especificamente para o acompanhamento e análise de commodities agrícolas em tempo real. O sistema fornece visualizações detalhadas de dados históricos e cotações atuais de produtos como trigo, milho e câmbio do dólar, utilizando a API da Alpha Vantage como fonte de dados.

## 📋 Visão Geral do Sistema

O AgroData foi projetado como uma solução completa para profissionais do agronegócio, traders e analistas que necessitam de acesso rápido e confiável a informações financeiras sobre commodities agrícolas. O sistema oferece uma interface moderna e responsiva com recursos avançados de visualização de dados.

### Propósito e Objetivos

- **Monitoramento em Tempo Real**: Acompanhamento de cotações e variações de commodities agrícolas
- **Análise Histórica**: Visualização de dados históricos com diferentes intervalos temporais (anual, mensal, trimestral)
- **Interface Intuitiva**: Dashboard responsivo com tema claro/escuro e componentes modernos
- **Integração Robusta**: Conectividade com APIs financeiras para dados precisos e atualizados

## 🚀 Tecnologias e Arquitetura

### Stack Principal

- **Frontend Framework**: Next.js 15 com App Router
- **UI Library**: React 19 
- **Linguagem**: TypeScript para type safety
- **Gerenciamento de Estado**: TanStack Query (React Query) para cache e sincronização
- **Autenticação**: NextAuth.js com suporte a Google e GitHub OAuth
- **Estilização**: Tailwind CSS 4 com sistema de design responsivo
- **Componentes UI**: shadcn/ui e Radix UI primitives
- **Gráficos**: Recharts para visualizações interativas
- **Formulários**: React Hook Form com Zod validation
- **Ícones**: Lucide React

### Arquitetura do Sistema

```
┌─────────────────────────────────────┐
│             Frontend (Next.js)      │
├─────────────────────────────────────┤
│  • React Components                 │
│  • TypeScript Types                 │
│  • TanStack Query Cache             │
│  • NextAuth Session Management      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Alpha Vantage API           │
├─────────────────────────────────────┤
│  • Commodities Data (WHEAT, CORN)   │
│  • Global Quotes                    │
│  • Currency Exchange Rates          │
│  • Historical Time Series           │
└─────────────────────────────────────┘
```

## ✨ Funcionalidades Principais

### 🔑 Gerenciamento de API Key
- Interface para configuração da chave API da Alpha Vantage
- Armazenamento seguro no localStorage
- Context API para compartilhamento global da chave

### 📊 Dashboard de Cotações
- **Cards de Commodities**: Visualização em tempo real de:
  - Trigo (Wheat)
  - Milho (Corn) 
  - Dólar (USD)
- **Indicadores Visuais**: Cores diferenciadas para cada commodity
- **Dados Exibidos**: Preço atual, variação percentual, volume, máximas e mínimas

### 📈 Visualização de Dados Históricos
- **Gráficos Interativos**: Linha temporal com dados históricos
- **Múltiplos Intervalos**: Anual, mensal e trimestral
- **Comparação**: Visualização simultânea de múltiplas commodities
- **Tabela de Dados**: Listagem detalhada com paginação

### 🔐 Sistema de Autenticação
- **OAuth Integration**: Login com Google e GitHub
- **Sessão Persistente**: Gerenciamento automático de sessões
- **Proteção de Rotas**: Middleware de autenticação

### 🎨 Interface e UX
- **Design System**: Baseado em shadcn/ui com componentes consistentes
- **Tema Dinâmico**: Suporte a modo claro e escuro
- **Responsividade**: Layout adaptável para desktop e mobile
- **Notificações**: Sistema de toast para feedback ao usuário

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 20+ 
- npm ou yarn
- Chave API da Alpha Vantage (gratuita em [alphavantage.co](https://www.alphavantage.co/))

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd dashboard-test-front
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```

   Preencha o arquivo `.env.local`:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=https://www.alphavantage.co/query
   NEXT_PUBLIC_VERSION=1.0.0
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # OAuth Providers (opcional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
src/
├── @types/                 # Definições de tipos TypeScript
│   ├── Auth.ts             # Tipos de autenticação
│   ├── Commodity.ts        # Interface para dados de commodities
│   ├── Quote.ts           # Interface para cotações
│   └── ...
├── app/                    # App Router (Next.js 15)
│   ├── (landing)/         # Grupo de rotas principal
│   │   ├── components/    # Componentes específicos da landing
│   │   └── page.tsx       # Página principal
│   ├── (sign)/           # Grupo de rotas de autenticação
│   └── layout.tsx        # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── ...
├── config/               # Configurações
│   ├── api.ts           # Configuração do Axios
│   ├── auth.ts          # Configuração NextAuth
│   └── queryClient.ts   # Configuração TanStack Query
├── contexts/            # Context Providers
│   └── ApiKeyContext.tsx
├── hooks/              # Custom Hooks
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── use-mobile.ts
├── lib/               # Utilitários e bibliotecas
│   ├── utils.ts       # Utilitários gerais
│   └── session.ts     # Gerenciamento de sessão
├── providers/         # Providers da aplicação
│   ├── AuthProvider.tsx
│   ├── QueryClientProvider.tsx
│   └── SessionProvider.tsx
├── services/          # Camada de serviços/API
│   ├── auth.service.ts
│   ├── commodities.service.ts
│   ├── currency-exchange.service.ts
│   └── quote.service.ts
├── utils/            # Utilitários específicos
│   ├── mergeDataSeries.ts
│   ├── toast.tsx
│   └── ...
└── middleware.ts     # Middleware Next.js
```

## 🔌 Integração com APIs

### Alpha Vantage API

O sistema utiliza três principais endpoints da Alpha Vantage:

1. **Global Quote** (`GLOBAL_QUOTE`)
   ```typescript
   // Obtenção de cotação atual
   GET /?function=GLOBAL_QUOTE&symbol=WHEAT&apikey={API_KEY}
   ```

2. **Commodities** (`WHEAT`, `CORN`)
   ```typescript
   // Dados históricos de commodities
   GET /?function=WHEAT&interval=monthly&apikey={API_KEY}
   ```

3. **Currency Exchange** (`CURRENCY_EXCHANGE_RATE`)
   ```typescript
   // Taxa de câmbio
   GET /?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey={API_KEY}
   ```

### Camada de Serviços

```typescript
// Exemplo de uso do serviço
const commodityData = await CommoditiesService.get('WHEAT', 'monthly', apiKey);
const quote = await QuoteService.get('CORN', apiKey);
```

## 🐳 Docker e Deploy

### Dockerfile

O projeto inclui configuração Docker para deploy em produção:

```dockerfile
# Build stage
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Comandos Docker

```bash
# Build da imagem
docker build -t agrodata .

# Executar container
docker run -p 3000:3000 agrodata
```

## 🔧 Scripts Disponíveis

```json
{
  "dev": "next dev --turbopack",      // Servidor de desenvolvimento com Turbopack
  "build": "next build",             // Build para produção
  "start": "next start",             // Servidor de produção
  "lint": "next lint"                // Linting do código
}
```

## 🧪 Desenvolvimento e Testes

### Comandos de Desenvolvimento

```bash
# Desenvolvimento com hot reload
npm run dev

# Build e verificação
npm run build
npm run start

# Análise de código
npm run lint
```

### Estrutura de Componentes

Os componentes seguem o padrão de atomic design:

- **Atoms**: Componentes básicos (Button, Input, etc.)
- **Molecules**: Combinações de atoms (Cards, Forms)
- **Organisms**: Seções complexas (Dashboard, Tables)
- **Templates**: Layouts de página
- **Pages**: Páginas completas

## 📈 Performance e Otimizações

### Estratégias Implementadas

1. **Next.js 15 Features**:
   - App Router para melhor performance
   - Turbopack para builds mais rápidos
   - Automatic optimizations

2. **React Query**:
   - Cache inteligente de dados
   - Background refetch
   - Optimistic updates

3. **Code Splitting**:
   - Lazy loading de componentes
   - Route-based splitting

4. **Styling**:
   - Tailwind CSS para CSS otimizado
   - CSS-in-JS minimizado

## 🔒 Segurança

### Medidas Implementadas

- **Environment Variables**: Configurações sensíveis isoladas
- **API Key Management**: Armazenamento seguro no cliente
- **NextAuth**: Autenticação OAuth segura
- **TypeScript**: Type safety em runtime
- **CORS Handling**: Configuração adequada de CORS

## 🤝 Contribuição

### Guidelines de Desenvolvimento

1. **Código**: Siga os padrões TypeScript e ESLint
2. **Commits**: Use conventional commits
3. **Branches**: Feature branches com Pull Requests
4. **Testes**: Inclua testes para novas funcionalidades

### Estrutura de Commit

```
feat: adiciona nova funcionalidade de gráficos
fix: corrige bug na autenticação
docs: atualiza documentação da API
style: ajusta formatação do código
```

## 📄 Licença

Este projeto é desenvolvido para fins de teste e demonstração técnica.

## 🆘 Suporte e Contato

Para dúvidas, sugestões ou problemas:

1. Abra uma **Issue** no repositório
2. Consulte a documentação da [Alpha Vantage API](https://www.alphavantage.co/documentation/)
3. Verifique os logs do console para debug

---

**Desenvolvido com ❤️ usando Next.js e React**
