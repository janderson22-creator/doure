# Ghee Artesanal — página de pedidos

Next.js + Tailwind CSS. O cliente escolhe unidade ou atacado, tamanho, tipo de pote, sabor e forma de receber. No fim, o pedido abre no WhatsApp já formatado.

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Antes de publicar (edite `lib/catalog.ts`)

1. `BRAND.whatsapp`: seu número com país + DDD, só dígitos (ex.: `5584999999999`).
2. `BRAND.name`, `BRAND.tagline`, `BRAND.instagram`, `BRAND.pickupNote`.
3. Preços em `SIZES` (confira as margens, os valores atuais são sugestões).
4. Mínimo do atacado em `RULES.wholesaleMinUnits` (hoje: 12 potes).

## Trocar as imagens

Coloque suas fotos em `public/images/` e aponte o caminho no campo `image` de cada tamanho em `lib/catalog.ts`. As imagens atuais são só de exemplo (SVG).
Para a capa (hero), troque os dois `src` em `components/Hero.tsx`.

## Adicionar ou remover opções (tudo em `lib/catalog.ts`)

- **Tamanho novo**: copie um bloco de `SIZES`, mude `id`, `label`, `image` e os preços.
- **Sabor novo**: inclua um item em `FLAVORS` (use `priceExtra` se cobrar a mais).
- **Material novo**: inclua em `MATERIALS` e dê preço em cada tamanho. Se um tamanho não tiver preço para o material, ele simplesmente não aparece.
- **Remover**: apague o item. Pedidos em andamento ignoram o que saiu do catálogo.

## Estrutura

```
lib/catalog.ts     dados editáveis (marca, regras, preços, sabores)
lib/pricing.ts     cálculo de preços e linhas do pedido
lib/whatsapp.ts    mensagem e link do WhatsApp
components/        interface (Hero, SizeCard, OrderBuilder, OrderSummary...)
```

## Publicar

O jeito mais simples é a Vercel: suba o projeto no GitHub e importe na Vercel. Não precisa de variáveis de ambiente.
