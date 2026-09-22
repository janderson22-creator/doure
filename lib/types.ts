export type Mode = "unidade" | "atacado";
export type Receiving = "retirada" | "entrega";

/** Material do pote (ex.: vidro, plástico). */
export type Material = {
  id: string;
  label: string;
  hint: string;
};

/** Sabor (ex.: tradicional, chimichurri). */
export type Flavor = {
  id: string;
  name: string;
  description: string;
  /** Cor da bolinha do sabor na interface. */
  color: string;
  /** Valor somado ao preço do pote (opcional). Ex.: 2 para cobrar R$ 2 a mais. */
  priceExtra?: number;
};

/** Tamanho do pote (ex.: 190g, 300g) com a tabela de preços. */
export type Size = {
  id: string;
  label: string;
  image: string;
  /** prices[modo][materialId] = preço do pote. Se o material não existir, ele não aparece. */
  prices: Record<Mode, Record<string, number>>;
};

/** Quantidades escolhidas: chave = `${tamanho}|${material}|${sabor}`. */
export type Cart = Record<string, number>;

export type CartLine = {
  key: string;
  size: Size;
  material: Material;
  flavor: Flavor;
  qty: number;
  unitPrice: number;
  total: number;
};

export type Customer = {
  name: string;
  business: string;
  address: string;
  notes: string;
};
