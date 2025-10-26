# Under All Intelligence - Documentação Técnica

## 📋 Visão Geral

Sistema de inteligência artificial conversacional com interface neural futurística, construído com React + TypeScript + Tailwind CSS, integrado com backend Supabase e AI Gateway.

---

## 🏗️ Arquitetura do Projeto

```
src/
├── components/
│   ├── ChatArea.tsx              # Interface principal de chat
│   ├── AppSidebar.tsx            # Barra lateral de navegação
│   ├── Dashboard.tsx             # Dashboard de controle
│   ├── NeuralTerminal.tsx        # Terminal neural (futuro)
│   ├── SandboxPanel.tsx          # Painel sandbox
│   ├── SandboxServersPanel.tsx   # Painel de servidores
│   ├── ControlGrid.tsx           # Grade de controles/métricas
│   ├── AIStatusNode.tsx          # Nó de status individual
│   └── ui/                       # Componentes shadcn/ui
│
├── hooks/
│   ├── useStreamingChat.ts       # Hook de chat com streaming
│   ├── use-mobile.tsx            # Detecção de mobile
│   └── use-toast.ts              # Sistema de notificações
│
├── pages/
│   ├── Index.tsx                 # Página principal
│   └── NotFound.tsx              # Página 404
│
├── integrations/
│   └── supabase/
│       ├── client.ts             # Cliente Supabase (auto-gerado)
│       └── types.ts              # Types TypeScript (auto-gerado)
│
├── assets/
│   ├── underall-logo.png         # Logo Under All
│   └── brand-guidelines.png      # Guidelines da marca
│
├── lib/
│   └── utils.ts                  # Utilitários (cn, etc.)
│
├── index.css                     # Design system e tokens CSS
├── App.tsx                       # Componente raiz
└── main.tsx                      # Entry point

supabase/
├── functions/
│   └── chat/
│       └── index.ts              # Edge function de chat AI
└── config.toml                   # Configuração Supabase
```

---

## 🎨 Design System

### Tokens de Cor (HSL)

Definidos em `src/index.css`:

```css
/* Cores Primárias */
--primary: 142 45% 39%          /* Verde principal (#547562) */
--primary-glow: 142 45% 50%     /* Verde brilhante */
--primary-dim: 142 35% 30%      /* Verde escuro */

/* Background */
--background: 142 15% 8%        /* Preto esverdeado (#121614) */
--background-secondary: 142 12% 12%

/* Acentos */
--accent: 45 93% 47%            /* Amarelo/Âmbar (#E6B800) */
--success: 142 76% 36%          /* Verde neon (#15B854) */

/* Bordas e sombras */
--border: 142 30% 20%
--ring: 142 45% 39%

/* Gradientes */
--gradient-primary: linear-gradient(135deg, 
  hsl(var(--primary)), 
  hsl(var(--primary-glow)))
```

### Animações Customizadas

```css
/* Pulso Neural */
@keyframes pulse-neural {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Glow Pulse */
@keyframes glow-pulse {
  0%, 100% { 
    box-shadow: 0 0 10px rgba(84, 117, 98, 0.3);
  }
  50% { 
    box-shadow: 0 0 20px rgba(84, 117, 98, 0.6);
  }
}
```

### Classes Utilitárias

```css
.glass-intense     /* Glassmorphism forte */
.glass-panel       /* Painel com efeito vidro */
.glass-soft        /* Vidro suave */

.glow-primary      /* Brilho verde */
.glow-neon         /* Brilho neon */
.glow-amber        /* Brilho âmbar */

.glow-box-primary  /* Box com glow verde */
.glow-box-cyan     /* Box com glow ciano */
.glow-box-neon     /* Box com glow neon */
```

---

## 🔌 Backend - Supabase + AI Gateway

### Edge Function: Chat AI

**Arquivo:** `supabase/functions/chat/index.ts`

**Endpoint:** `https://[PROJECT-ID].supabase.co/functions/v1/chat`

**Método:** POST

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer [SUPABASE_ANON_KEY]"
}
```

**Request Body:**
```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system",
    content: string
  }>
}
```

**Response:** Server-Sent Events (SSE) Stream

```
data: {"choices":[{"delta":{"content":"Olá"}}]}
data: {"choices":[{"delta":{"content":" como"}}]}
data: {"choices":[{"delta":{"content":" posso"}}]}
...
data: [DONE]
```

### Configuração (config.toml)

```toml
[functions.chat]
verify_jwt = false  # Função pública
```

### Modelo AI Utilizado

- **Modelo:** `google/gemini-2.5-flash`
- **Gateway:** `https://ai.gateway.lovable.dev/v1/chat/completions`
- **API Key:** `LOVABLE_API_KEY` (auto-provisionada)

---

## 🪝 Hook: useStreamingChat

**Arquivo:** `src/hooks/useStreamingChat.ts`

### Funcionalidades

✅ Gerenciamento de estado de mensagens
✅ Streaming token-by-token em tempo real
✅ Parsing de SSE (Server-Sent Events)
✅ Tratamento de erros (429, 402, 500)
✅ Loading states
✅ Buffer de texto para chunks parciais
✅ Timestamp automático (pt-BR)

### API

```typescript
const { messages, sendMessage, isLoading } = useStreamingChat();

// Enviar mensagem
await sendMessage("Olá, como você está?");

// messages: Array<Message>
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
```

### Tratamento de Erros

```typescript
// Rate Limit (429)
toast({
  title: "Rate Limit",
  description: "Muitas solicitações. Tente novamente em alguns instantes.",
  variant: "destructive"
});

// Pagamento Necessário (402)
toast({
  title: "Pagamento Necessário",
  description: "Créditos insuficientes. Adicione fundos ao workspace.",
  variant: "destructive"
});

// Erro Genérico (500)
toast({
  title: "Erro",
  description: "Falha ao comunicar com AI. Tente novamente.",
  variant: "destructive"
});
```

---

## 🎯 Componente: ChatArea

**Arquivo:** `src/components/ChatArea.tsx`

### Estrutura

```
┌─────────────────────────────────┐
│ Header (Logo + Status)          │
├─────────────────────────────────┤
│                                 │
│  Messages Area                  │
│  (User + Assistant messages)    │
│  (Scrollable)                   │
│                                 │
├─────────────────────────────────┤
│ Input Area                      │
│ - Botões: Anexar, Voz          │
│ - Textarea (Enter para enviar) │
│ - Botão Enviar                 │
│ - Status: AI online, Sandbox   │
└─────────────────────────────────┘
```

### Features

- **Auto-scroll:** Scroll automático para última mensagem
- **Enter para enviar:** Shift+Enter para nova linha
- **Loading indicator:** 3 dots animados durante resposta
- **Timestamp:** Formato pt-BR (HH:MM)
- **Hover effects:** Scale e glow em mensagens
- **Glassmorphism:** Efeitos de vidro e blur

---

## 🎛️ Componentes de Status

### ControlGrid

Grade 3x2 com métricas do sistema:
- CPU Load (47%)
- Memory (8.2GB)
- Network (2.4GB/s)
- Storage (234GB)
- Tasks (23)
- GPU (89%)

### AIStatusNode

Nó individual de status com:
- Ícone Lucide
- Label
- Valor
- Status visual (active/working/idle)
- Animações de pulso

**Estados:**
```typescript
"active"  → Verde neon + pulso neural
"working" → Âmbar + pulso padrão
"idle"    → Cinza + sem animação
```

---

## 📱 Layout Responsivo

### Desktop (≥1024px)
```
┌──────────┬──────────────────────────────┐
│          │                              │
│ Sidebar  │  Main Content                │
│          │  (Chat Area + Sandbox)       │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Mobile (<1024px)
- Sidebar colapsável
- Chat fullscreen
- Sandbox em modal/sheet

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório (via GitHub)
git clone [seu-repo]
cd [nome-projeto]

# Instale dependências
npm install

# Configure variáveis de ambiente (.env)
VITE_SUPABASE_URL=https://[PROJECT-ID].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[ANON-KEY]
VITE_SUPABASE_PROJECT_ID=[PROJECT-ID]

# Execute em desenvolvimento
npm run dev
```

### Build para produção

```bash
npm run build
npm run preview  # Preview da build
```

---

## 🔐 Segurança

### CORS
Edge function configurada com CORS aberto:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

### Autenticação
- Edge function **pública** (`verify_jwt = false`)
- Sem necessidade de auth para chat básico
- API Key do AI Gateway gerenciada pelo backend

---

## 📦 Dependências Principais

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@supabase/supabase-js": "^2.76.1",
  "@tanstack/react-query": "^5.83.0",
  "lucide-react": "^0.462.0",
  "tailwindcss": "^3.x",
  "tailwindcss-animate": "^1.0.7"
}
```

---

## 🎨 Brand Guidelines

### Logo
- **Arquivo:** `src/assets/underall-logo.png`
- **Uso:** Header, loading states, avatar do bot

### Tipografia
- **Display:** Font "Orbitron" (cyberpunk/tech)
- **Mono:** Font "Fira Code" (código/terminal)
- **Body:** System font stack

### Paleta de Cores
- **Primária:** Verde militar (#547562)
- **Secundária:** Verde neon (#15B854)
- **Acento:** Amarelo âmbar (#E6B800)
- **Background:** Preto esverdeado (#121614)

---

## 🔮 Funcionalidades Futuras

Conforme especificação original:

1. **Real-time Thinking Steps** (Agente mostra raciocínio)
2. **File Browser** (Upload/gestão de arquivos)
3. **Remote Terminal** (SSH/comando remoto)
4. **WebSocket Agent** (Comunicação real-time)
5. **System Stats** (Métricas em tempo real)

---

## 📞 Suporte

- **Lovable Discord:** [https://discord.com/channels/1119885301872070706](https://discord.com/channels/1119885301872070706)
- **Docs:** [https://docs.lovable.dev](https://docs.lovable.dev)
- **GitHub Issues:** [seu-repositório]/issues

---

## 📄 Licença

Defina sua licença aqui (MIT, Apache 2.0, etc.)

---

## 🙏 Créditos

Desenvolvido com [Lovable](https://lovable.dev) - Full-stack AI development platform
