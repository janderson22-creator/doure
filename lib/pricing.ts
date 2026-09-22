import { FLAVORS, MATERIALS, SIZES } from "./catalog";
import type { Cart, CartLine, Flavor, Mode, Size } from "./types";

export const cartKey = (sizeId: string, materialId: string, flavorId: string) =>
  `${sizeId}|${materialId}|${flavorId}`;

/** Preço de um pote, ou undefined se essa combinação não existe. */
export function unitPrice(
  size: Size,
  materialId: string,
  flavor: Flavor,
  mode: Mode,
): number | undefined {
  const base = size.prices[mode]?.[materialId];
  if (base === undefined) return undefined;
  return base + (flavor.priceExtra ?? 0);
}

/** Materiais disponíveis para um tamanho no modo escolhido. */
export function materialsFor(size: Size, mode: Mode) {
  return MATERIALS.filter((m) => size.prices[mode]?.[m.id] !== undefined);
}

/** Menor preço do catálogo no modo escolhido (para o "a partir de"). */
export function fromPrice(mode: Mode): number {
  const all = SIZES.flatMap((s) => Object.values(s.prices[mode] ?? {}));
  return Math.min(...all);
}

/**
 * Transforma as quantidades em linhas do pedido.
 * Itens que saíram do catálogo (tamanho/sabor/material removido) são ignorados.
 */
export function buildLines(cart: Cart, mode: Mode): CartLine[] {
  const lines: CartLine[] = [];
  for (const size of SIZES) {
    for (const material of MATERIALS) {
      for (const flavor of FLAVORS) {
        const key = cartKey(size.id, material.id, flavor.id);
        const qty = cart[key] ?? 0;
        const price = unitPrice(size, material.id, flavor, mode);
        if (qty > 0 && price !== undefined) {
          lines.push({
            key,
            size,
            material,
            flavor,
            qty,
            unitPrice: price,
            total: price * qty,
          });
        }
      }
    }
  }
  return lines;
}

export function totals(lines: CartLine[]) {
  return {
    units: lines.reduce((sum, l) => sum + l.qty, 0),
    subtotal: lines.reduce((sum, l) => sum + l.total, 0),
  };
}
