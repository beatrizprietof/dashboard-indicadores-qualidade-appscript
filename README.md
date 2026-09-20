# 💻 Web App de Indicadores de Qualidade (Google Apps Script + HTML/JS)

> Aplicação web customizada e responsiva construída sobre o Google Apps Script para consolidar, tratar e exibir indicadores de qualidade em tempo real a partir de bases diagnósticas do Google Sheets.

---

## 🎯 Objetivo & Contexto de Negócio

* **Problema:** Os dados de monitoria e qualidade estavam dispersos em múltiplas abas operacionais dentro do Google Sheets (*Entrada Facilitada*, *Overpricing*, *Despublicados* e *Descartes*). Além disso, a associação entre analista e supervisor exigia atualizações manuais e fórmulas pesadas que travavam a planilha.
* **Solução:** Desenvolvimento de um **Web App customizado via Google Apps Script (HTMLService)**. A aplicação lê as 4 frentes diagnósticas via backend em JavaScript, realiza o enriquecimento automático da estrutura hierárquica (mapeando cada analista ao seu respetivo supervisor a partir da aba de *Gestão de Pessoas*) e serve uma interface web leve, dinâmica e responsiva.

---

## 🛠️ Tecnologias & Ferramentas

* **Backend & API:** [Google Apps Script](https://developers.google.com/apps-script) (JavaScript Server-Side)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Banco de Dados / Data Source:** Google Sheets API (Integração nativa)
* **Arquitetura Web:** HTMLService (`doGet`), JSON Data Parsing

---

## 🖼️ Demonstração Visual

### 1. Interface do Web App (Painel de Indicadores)
![Visão Geral do Web App](https://via.placeholder.com/800x400.png?text=Cole+aqui+um+print+do+Dashboard+executando)

### 2. Navegação entre as Frentes Diagnósticas
![Navegação do Painel](https://via.placeholder.com/800x400.png?text=Cole+aqui+um+GIF+mostrando+a+alternância+de+abas)

---

## ⚙️ Funcionalidades Técnicas & Backend

* 🔄 **Mapeamento Automático de Hierarquia:** Função em backend (`getDashboardData`) que cruza os e-mails dos analistas presentes nas bases com a aba `Gestão de Pessoas`, atribuindo o supervisor correto dinamicamente.
* 📦 **Consolidação Multibase (4 Pilares):** Processamento simultâneo das abas:
  1. *Entrada Facilitada [diag]*
  2. *Overpricing [diag]*
  3. *Despublicados [diag]*
  4. *Descartes [diag]*
* 🚀 **Performance & Escala:** Abordagem via script que elimina a necessidade de fórmulas complexas (`PROCV` / `XLOOKUP`) na planilha, deixando a base leve e evitando erros de cálculo.
* 🌐 **Acesso Web Autónomo:** Publicação como Web App (`doGet`) acessível diretamente via URL para utilizadores autorizados.

---

## 🏗️ Estrutura do Código

```text
├── Code.gs             # Backend: Leitura das planilhas, mapeamento e estruturação do JSON
└── Index.html          # Frontend: Interface visual, estilização e renderização dos gráficos/tabelas
