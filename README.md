# Landing Page — Crio HD / Serela Clinic (Dra. Rosana Lindolfo)

Projeto estático (HTML/CSS/JS puro), pronto para hospedagem convencional.

## Direção visual

Atelier minimalista (estrutura do modelo Melysa): hero full-bleed escuro com foto,
declaração de resultados com miniaturas flutuantes, faixa de números sobre imagem,
regiões em modo ancorado (pin no scroll em telas largas), bloco de autoridade,
formulário com inputs de linha única e respostas em chips, FAQ em acordeão.

Paleta: carvão `#141414` · ouro premium `#c8a24a` · ouro claro `#e3c57e` ·
champagne `#f0dfb4` · marfim `#fffdf8`
Tipografia: Playfair Display (títulos) + Jost (textos) — mantidas do modelo original.

## Antes de publicar

1. `app.js`: preencher `WEBHOOK_URL` com o endpoint do CRM (Make/Zapier/n8n).
2. `obrigado.html`: preencher `WHATSAPP_NUMBER` no formato `5511999999999`
   (sem ele, o CTA cai no Instagram `@serelaclinic`).
3. Conferir as fotos já aplicadas (a faixa de números é só texto, sem imagem) (todas em `assets/`, geradas a partir de `Fotos/`):
   - hero: `hero-crio-hd.webp`
   - antes e depois: `antes-depois-abdomen/flancos/remodelacao.webp`
   - miniaturas da dobra de resultados: `mini-1..4.webp`
   - autoridade: `dra-rosana.webp`
   Nos pares de antes e depois, a página assume **antes à esquerda, depois à direita** —
   confirmar com a clínica antes de publicar.
4. Confirmar a autorização de uso de imagem das pacientes e remover a pasta `Fotos/`
   do que for para o servidor (é material de origem, não precisa subir).
5. Confirmar endereço e @ do Instagram no rodapé (`index.html`).
6. Inserir scripts de analytics / Google Tag Manager, se aplicável.

## Arquivos

- `index.html`: landing page (inclui modais de Política de Privacidade e Termos de Uso)
- `obrigado.html`: confirmação + CTA de WhatsApp com mensagem pré-definida
- `style.css`: sistema visual e responsivo (inclui modais e página de obrigado)
- `app.js`: modais, máscara de telefone, validação, envio e animações de entrada
- `.htaccess`: index padrão e rota amigável `/obrigado`
