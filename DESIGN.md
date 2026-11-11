---
name: Kado Academia
description: Energia esportiva cinematográfica com treino e pessoas reais.
colors:
  orange: "#ff7a25"
  orange-hover: "#ff9955"
  black: "#10100f"
  panel: "#1b1c19"
  raised: "#242520"
  paper: "#f0f0e8"
  muted: "#babcb3"
  line: "#3e4037"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(80px, 11.7vw, 180px)"
    fontWeight: 700
    lineHeight: 0.87
    letterSpacing: "-.02em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(58px, 7.5vw, 112px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-.015em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 65px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-.015em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "18px"
  lg: "36px"
spacing:
  gutter: "clamp(22px, 6vw, 100px)"
  section: "clamp(75px, 10vw, 145px)"
  panel: "clamp(28px, 4vw, 58px)"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
    rounded: "{rounded.sm}"
    typography: "{typography.label}"
    padding: "17px 25px"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
  button-header:
    textColor: "{colors.paper}"
    rounded: "5px"
    padding: "10px 16px"
  button-header-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.black}"
  text-link:
    padding: "14px 0"
  modality-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "{spacing.panel}"
  modality-selected:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
    rounded: "{rounded.sm}"
---

# Design System: Kado Academia

## Overview

**Creative North Star: "Energia em movimento"**

A identidade esportiva cinematográfica aceita na conversa combina preto, branco e laranja Kado com imagens reais, títulos monumentais e uma leitura direta. O logo original e a presença das pessoas sustentam a personalidade; o acabamento vem da composição e do ritmo entre superfícies.

O sistema usa contraste tonal e movimento ligado à ação ou ao scroll nativo. A versão móvel recompõe tipografia, navegação e modalidades para o toque. Conteúdo e contato continuam disponíveis com movimento reduzido.

**Key Characteristics:**

- Tipografia condensada monumental e leitura em Manrope.
- Laranja Kado como ação e superfície de energia.
- Imagens reais, diagonais e continuidade entre superfícies.
- Movimento responsivo à interação, com alternativa estática.

Documentado em 22/10/2026 a partir de `src/style.css`, `src/main.tsx`, `PRODUCT.md` e `SURFACE.md`. Os tokens acima registram a implementação; a composição específica da home permanece em `SURFACE.md`.

## Colors

A paleta aproxima o preto da borracha, o branco da sinalização e o laranja da identidade Kado.

### Primary

- **Laranja Kado** (`orange`): CTAs, seleção das modalidades, progresso de leitura e grandes superfícies de transição.
- **Laranja aberto** (`orange-hover`): resposta ao hover do botão principal.

### Neutral

- **Preto borracha** (`black`): fundo principal e texto sobre laranja ou papel.
- **Carvão painel** (`panel`): conteúdo de modalidades e perguntas.
- **Carvão elevado** (`raised`): variável disponível no CSS; ainda sem aplicação recorrente observada.
- **Papel de sinalização** (`paper`): texto principal e superfície clara da estrutura.
- **Cinza leitura** (`muted`): conteúdo secundário sobre fundo escuro.
- **Cinza divisória** (`line`): separações, bordas e controles discretos.

**The Identidade Kado Rule.** Preserve o laranja, os neutros e o logo original; imagens e texto devem continuar legíveis em cada superfície.

O roxo original do monograma de Bruno Luque pertence à assinatura autoral obrigatória desta prévia, conforme a política de 22/10/2026. Ele não é uma nova cor da interface Kado e não integra os tokens da paleta. A assinatura usa exclusivamente o SVG canônico `logo-bruno-luque.svg`; não deve ser transferida ao site final sem acordo aprovado.

## Typography

**Display Font:** Barlow Condensed (fallback sans-serif).
**Body Font:** Manrope (fallback sans-serif).

Barlow Condensed traz força, compactação e escala; Manrope mantém instruções, descrições e contato claros. Os títulos usam peso 700; modalidades e navegação móvel também usam Barlow Condensed 600. Os textos usam Manrope 400 e os controles, 600.

### Hierarchy

- **Display:** chamada principal monumental; segunda linha em contorno. No celular, escala própria (`clamp(54px, 16vw, 105px)`, entrelinha `.9`).
- **Headline:** títulos das seções, com variações locais documentadas no CSS.
- **Title:** painel de modalidade; subtítulos da estrutura usam tamanho menor (`32px`, entrelinha `1`).
- **Body:** leitura base; descrições locais usam (13–15px), geralmente com largura de (35–44ch).
- **Label:** ações; links de texto usam (13px) e navegação desktop, (13px).

## Layout

Margens fluidas e espaços verticais amplos dão escala aos títulos e às imagens. A composição alterna pares de colunas com pesos próximos, listas de modalidades e faixas horizontais de equipe. A superfície clara tem recuo lateral (12px), reduzido a (8px) no celular.

Em (900px) ou menos, a navegação vira menu de tela inteira, as seções passam a uma coluna e as modalidades formam uma grade de duas colunas. O carrossel permanece horizontal com rolagem nativa e cartões de (78vw). CTAs de seção ganham largura total; o contato móvel flutua apenas quando outras ações de contato não estão visíveis. Ajustes de altura preservam o conteúdo em telas curtas e paisagem.

## Elevation & Depth

A profundidade vem principalmente de superfícies sobrepostas, recortes diagonais, fotografia, gradientes e cabeçalho translúcido com desfoque (12px). Painéis não usam sombras decorativas. O CTA móvel recebe a sombra funcional (`0 12px 30px -12px #000b`); o título do hero recebe sombra de leitura (`0 8px 32px rgba(0,0,0,.16)`). A preferência por transparência reduzida torna o cabeçalho opaco.

## Shapes

Cantos discretos nos botões, intermediários nas imagens e painéis, e amplos nas grandes superfícies seguem os tokens de raio. A fotografia da comunidade alterna cantos amplos e discretos. Bordas finas dividem listas e controles; setas diagonais reforçam direção. A cortina da home usa inclinação de (-20deg) e letras compensadas em (20deg).

## Components

### Buttons

O botão principal é firme e espaçoso, com altura mínima (58px), seta diagonal e cores definidas no frontmatter. Hover clareia o fundo e desloca a seta (3px, -3px). Pressionar reduz a escala para (.98), com spring sem bounce na ação principal. O botão do cabeçalho tem contorno fino e inverte as cores ao hover; links de texto usam sublinhado estrutural. O foco compartilhado tem contorno laranja (3px) com afastamento (6px).

### Cards / Containers

O painel de modalidade combina fundo carvão, título condensado, texto curto e CTA no fim. A troca de conteúdo usa deslocamento pequeno e opacidade, enquanto a seleção laranja acompanha a modalidade por spring sem bounce. Fotos preservam proporção e recorte; cartões de equipe utilizam imagens oficiais com rolagem e snap nativos.

### Navigation

Cabeçalho sticky de (88px), reduzido a (72px) no celular. Links desktop sinalizam hover e seção atual por linha laranja. O menu móvel usa títulos condensados, foco contido, fechamento por Escape e restauração do foco. Controles do carrossel têm (46px) e estado desabilitado visível; abas aceitam setas, Home e End.

A assinatura autoral no cabeçalho mede (22 × 30px), tem opacidade (.85) e não recebe interação. Sua posição absoluta fica ao lado do logo, a margem fluida mais (122px) no desktop ou (98px) no celular; não deve encobrir navegação, CTA ou conteúdo.

### Imagem e transição de superfície

Na home, o vídeo real e sua imagem alternativa ocupam a tela; a cortina diagonal laranja conduz ao manifesto com KADO monumental. Fotografias usam aproximação sutil vinculada ao scroll. São expressões existentes da direção da home, sem impor a mesma sequência a toda nova superfície.

O vídeo tem controle de pausa e interrompe a reprodução fora de vista, em aba oculta ou com filme aberto. Movimento reduzido remove o percurso da cortina e a aproximação das imagens; a imagem estática e o conteúdo permanecem. Economia de dados evita carregar o vídeo automático.

### Perguntas e filme

Perguntas usam `details` nativo, divisórias e sinal de mais que gira ao abrir. O filme abre em `dialog` nativo com controles de vídeo, fechamento acessível e retorno de foco.

## Do's and Don'ts

### Do:

- **Do** preserve o logo original, a paleta Kado e os materiais reais da academia.
- **Do** recomponha a experiência para o celular e mantenha contato, leitura e foco acessíveis.
- **Do** conecte movimento à navegação, seleção ou continuidade visual e respeite movimento reduzido.

### Don't:

- **Don't** substitua a identidade por imagens genéricas ou materiais de outros clientes.
- **Don't** use partículas ou neon, rejeitados na direção vigente.
- **Don't** faça conteúdo ou contato dependerem da reprodução automática ou de animação.
