const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function money(value: number): string {
  return brl.format(value);
}

export function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}
