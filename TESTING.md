# 🧪 AgroData - Test Implementation Guide

Este documento descreve a implementação completa dos testes para o projeto AgroData Dashboard.

## 📋 Resumo da Implementação

### ✅ Configuração Base
- **Jest** configurado com Next.js
- **React Testing Library** para testes de componentes
- **jsdom** para ambiente de teste do navegador
- **Coverage reporting** com limites de 70%

### 🏗️ Estrutura de Testes Criada

```
src/
├── __tests__/
│   ├── utils/
│   │   └── testUtils.tsx          # Utilitários de teste e render customizado
│   ├── mocks/
│   │   └── apiMocks.ts            # Mocks de API e dados
│   └── setup.test.ts              # Teste básico de configuração
├── lib/
│   └── __tests__/
│       └── utils.test.ts          # Testes de utilitários (cn function)
├── components/
│   ├── Title/__tests__/
│   │   └── Title.test.tsx         # Testes do componente Title
│   ├── Alert/__tests__/
│   │   └── Alert.test.tsx         # Testes do componente Alert
│   └── Cards/CommoditsCard/__tests__/
│       └── CommoditsCard.test.tsx # Testes do CommoditsCard
└── app/(landing)/
    ├── __tests__/
    │   └── page.test.tsx          # Testes da página principal
    └── components/Quotes/__tests__/
        └── Quotes.test.tsx        # Testes do componente Quotes
```

## 🎯 Tipos de Testes Implementados

### 1. Testes de Utilitários
- **lib/utils.test.ts**: Testes da função `cn()` para merge de classes CSS
- Cobertura completa de casos edge e diferentes tipos de input

### 2. Testes de Componentes Básicos

#### Title Component
- Renderização correta do título
- Aplicação de classes CSS de estilo e animação
- Estrutura semântica (h1)

#### Alert Component
- Abertura e fechamento do dialog
- Callbacks de confirmação e cancelamento
- Labels customizáveis
- Navegação por teclado e acessibilidade

### 3. Testes de Componentes Complexos

#### CommoditsCard Component
- Estados de loading com skeleton
- Renderização com dados completos
- Tratamento de dados faltantes (N/A)
- Variantes de badge (success/destructive/default)
- Classes CSS customizáveis
- Formatação de datas
- Detecção de mudanças positivas/negativas

### 4. Testes de Integração

#### Quotes Component
- Integração com React Query
- Múltiplas chamadas de API simultâneas
- Estados de loading e error
- Toast notifications
- Mudanças dinâmicas de API key
- Layout responsivo
- Aplicação de estilos por commodity

#### Landing Page
- Renderização de todos os componentes
- Ordem correta dos elementos
- Layout e responsividade
- Acessibilidade

## 🛠️ Ferramentas e Mocks

### Mocks Globais (jest.setup.js)
- **Next.js Router**: useRouter, useSearchParams, usePathname
- **Next.js Image**: Componente otimizado de imagem
- **Lucide React**: Ícones SVG
- **ResizeObserver**: API do navegador

### Test Utils
- **Custom Render**: Wrapper com QueryClient para React Query
- **Mock Data**: Dados de exemplo para commodities
- **API Mocks**: Responses simuladas da API
- **Helper Functions**: Utilitários para testes assíncronos

### API Mocks
- **Axios**: Cliente HTTP mockado
- **API Responses**: Success, error e rate limit scenarios
- **Environment Variables**: Chaves de API e configurações
- **LocalStorage**: Armazenamento local mockado

## 🚀 Como Executar os Testes

### Comandos Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Executar script personalizado
./run-tests.sh
```

### Script de Teste Completo

O script `run-tests.sh` executa:
1. Todos os testes com coverage
2. ESLint para verificação de código
3. Relatório colorido de resultados

## 📊 Configuração de Coverage

### Limites Definidos
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Arquivos Excluídos
- Arquivos de declaração TypeScript (`.d.ts`)
- Layouts, loading e error pages do Next.js
- node_modules e .next directory

### Relatório de Coverage
- Gerado na pasta `coverage/`
- Acessar `coverage/lcov-report/index.html` para relatório visual

## 🎨 Padrões de Teste

### Nomenclatura
- Arquivos de teste: `*.test.tsx` ou `*.test.ts`
- Describe blocks: Nome do componente/função
- Test cases: "should [action] when [condition]"

### Estrutura de Testes
```javascript
describe("ComponentName", () => {
  beforeEach(() => {
    // Setup
  });

  it("should render correctly", () => {
    // Arrange, Act, Assert
  });

  describe("when condition", () => {
    it("should behave as expected", () => {
      // Test specific scenario
    });
  });

  describe("accessibility", () => {
    // Accessibility-specific tests
  });
});
```

### Melhores Práticas Aplicadas
- **AAA Pattern**: Arrange, Act, Assert
- **User-centric testing**: Testar comportamento do usuário
- **Mocking estratégico**: Mock apenas dependências externas
- **Accessibility testing**: Verificação de ARIA labels e navegação
- **Edge cases**: Testes de cenários limite

## 🔧 Manutenção e Extensão

### Adicionando Novos Testes
1. Criar arquivo `*.test.tsx` próximo ao componente
2. Usar os test utils em `src/__tests__/utils/testUtils.tsx`
3. Aplicar mocks necessários de `src/__tests__/mocks/apiMocks.ts`
4. Seguir os padrões de nomenclatura estabelecidos

### Atualizando Mocks
- Adicionar novos mocks em `apiMocks.ts`
- Atualizar `jest.setup.js` para mocks globais
- Manter dados de teste em `testUtils.tsx`

## 🐛 Debugging

### Comandos Úteis
```bash
# Debug testes específicos
npm test -- --testNamePattern="ComponentName"

# Verbose output
npm test -- --verbose

# Watch mode para desenvolvimento
npm run test:watch
```

### Dicas de Debugging
- Usar `screen.debug()` para visualizar DOM
- `console.log` nos testes para debug de dados
- `waitFor()` para operações assíncronas
- `act()` para atualizações de estado do React

---

## 📈 Status da Implementação

✅ **Concluído**
- Configuração Jest + Next.js
- Testes de utilitários
- Testes de componentes básicos
- Testes de componentes complexos
- Testes de integração
- Mocks e test utils
- Coverage reporting
- Script de execução

🎯 **Cobertura Atual**: Preparado para atingir os 70% de coverage estabelecidos

---

*Esta implementação fornece uma base sólida e extensível para testes no projeto AgroData, seguindo as melhores práticas da comunidade React/Next.js.*
