# ⛽ ArÁguaPT

> Verifica em tempo real se o ar e água estão a funcionar nos postos de gasolina em Portugal.

---

## 🚀 Como colocar online (passo a passo)

### PASSO 1 — Configurar a base de dados (Supabase)

1. Entra em [supabase.com](https://supabase.com) e faz login
2. Clica em **"New Project"**
3. Dá um nome: `araguapt` · escolhe a região: **West EU (Ireland)**
4. Define uma password forte e clica **"Create new project"**
5. Aguarda ~2 minutos até o projeto estar pronto
6. No menu da esquerda clica em **"SQL Editor"**
7. Cola o conteúdo do ficheiro `supabase_schema.sql` e clica **"Run"**
8. ✅ A tua base de dados está pronta!

**Obter as chaves:**
- Menu esquerdo → **Settings** → **API**
- Copia o **Project URL** e o **anon public key**

---

### PASSO 2 — Colocar o código no GitHub

1. Entra em [github.com](https://github.com) e faz login
2. Clica no **"+"** no canto superior direito → **"New repository"**
3. Nome: `araguapt` · deixa público · clica **"Create repository"**
4. Na página seguinte, clica em **"uploading an existing file"**
5. Arrasta todos os ficheiros desta pasta e clica **"Commit changes"**
6. ✅ Código no GitHub!

---

### PASSO 3 — Publicar online (Vercel)

1. Entra em [vercel.com](https://vercel.com) e faz login com o GitHub
2. Clica em **"Add New Project"**
3. Seleciona o repositório `araguapt` e clica **"Import"**
4. Antes de clicar Deploy, clica em **"Environment Variables"** e adiciona:
   - `REACT_APP_SUPABASE_URL` → o teu Project URL do Supabase
   - `REACT_APP_SUPABASE_ANON_KEY` → a tua anon key do Supabase
5. Clica **"Deploy"** e aguarda ~2 minutos
6. ✅ A tua app está online com um link público!

---

## 📁 Estrutura do projeto

```
araguapt/
├── public/
│   └── index.html          # HTML base com meta tags PWA
├── src/
│   ├── App.js              # App principal + navegação
│   ├── index.js            # Ponto de entrada React
│   ├── lib/
│   │   └── supabase.js     # Ligação à base de dados
│   └── components/
│       ├── UI.js           # Componentes partilhados
│       ├── TelaMapa.js     # Ecrã do mapa
│       ├── TelaLista.js    # Ecrã da lista com filtros
│       ├── TelaReportar.js # Ecrã para fazer reportes
│       ├── TelaPerfil.js   # Ecrã do perfil
│       └── ModalPostoDetalhe.js  # Modal detalhe do posto
├── supabase_schema.sql     # SQL para criar a base de dados
├── .env.example            # Template das variáveis de ambiente
└── package.json            # Dependências do projeto
```

---

## 🛠️ Tecnologias utilizadas

| O quê | Ferramenta | Custo |
|---|---|---|
| Interface | React | Grátis |
| Base de dados | Supabase | Grátis (até 500MB) |
| Publicação | Vercel | Grátis |
| Mapa (futuro) | Google Maps API | Grátis até 28k pedidos/mês |

---

## 📱 Instalar como app no telemóvel

Depois de publicado, no telemóvel:
- **iPhone:** Safari → botão de partilha → "Adicionar ao ecrã principal"
- **Android:** Chrome → menu (⋮) → "Adicionar ao ecrã principal"

---

Feito com ❤️ em Portugal 🇵🇹
