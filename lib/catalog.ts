import type { Flavor, Material, Mode, Receiving, Size } from "./types";

/**
 * ============================================================
 *  TUDO QUE VOCÊ VAI QUERER EDITAR FICA NESTE ARQUIVO
 * ============================================================
 */

export const BRAND = {
  name: "Douré Ghee Artesanal", // TODO: troque pelo nome da marca
  tagline: "Feito em pequenos lotes, direto da nossa cozinha.",
  /** WhatsApp que recebe os pedidos: código do país + DDD + número, só dígitos. */
  whatsapp: "5584997104340", // TODO: troque pelo seu número
  instagram: "@doureghee", // TODO
  /** Texto mostrado na opção de retirada. */
  pickupNote: "Combinamos local e horário pelo WhatsApp.",
};

export const RULES = {
  /** Mínimo de potes (somando tudo) para comprar no atacado. */
  wholesaleMinUnits: 12,
  /** Nome do serviço de entrega para compras por unidade. */
  unitDeliveryService: "Uber Moto",
};

export const MODES: { id: Mode; title: string; description: string }[] = [
  {
    id: "unidade",
    title: "Por unidade",
    description: "Para consumo em casa. Leve quantos potes quiser.",
  },
  {
    id: "atacado",
    title: "Atacado",
    description: `Para padarias, mercados e lojas. A partir de ${RULES.wholesaleMinUnits} potes, com entrega grátis.`,
  },
];

export const RECEIVING_LABELS: Record<Receiving, string> = {
  retirada: "Retirada",
  entrega: "Entrega",
};

/** Para adicionar um material novo: inclua aqui e dê um preço nos tamanhos abaixo. */
export const MATERIALS: Material[] = [
  { id: "vidro", label: "Vidro", hint: "Fica bonito e dá para reutilizar" },
  { id: "plastico", label: "Plástico", hint: "Mais em conta" },
];

/** Para adicionar um sabor novo: é só incluir mais um item aqui. */
export const FLAVORS: Flavor[] = [
  {
    id: "tradicional",
    name: "Tradicional",
    description: "O clássico dourado, só manteiga clarificada.",
    color: "#F2B632",
  },
  {
    id: "chimichurri",
    name: "Chimichurri",
    description: "Com ervas e alho. Bom para carnes, pães e ovos.",
    color: "#5C8A3A",
    // priceExtra: 2, // descomente se quiser cobrar a mais pelo sabor
  },
];

/**
 * Para adicionar um tamanho novo: copie um bloco abaixo, mude id, label, image e preços.
 * Para remover: apague o bloco.
 *
 * Custos de referência do pote de vidro: 190g = R$ 10 | 300g = R$ 14.
 */
export const SIZES: Size[] = [
  {
    id: "190g",
    label: "190g",
    image: "/images/pote-190.svg",
    prices: {
      unidade: { vidro: 22.9, plastico: 18.9 },
      atacado: { vidro: 17.9, plastico: 14.9 },
    },
  },
  {
    id: "300g",
    label: "300g",
    image: "/images/pote-300.svg",
    prices: {
      unidade: { vidro: 32.9, plastico: 27.9 },
      atacado: { vidro: 25.9, plastico: 21.9 },
    },
  },
];
