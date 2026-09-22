import { BRAND, RULES } from "./catalog";
import { money, plural } from "./format";
import type { CartLine, Customer, Mode, Receiving } from "./types";

export type OrderData = {
  mode: Mode;
  receiving: Receiving;
  lines: CartLine[];
  units: number;
  subtotal: number;
  customer: Customer;
};

const clean = (s: string) => s.replace(/\u00a0/g, " ");

export function buildMessage(o: OrderData): string {
  const isWholesale = o.mode === "atacado";
  const out: string[] = [];

  out.push(`🧈 *NOVO PEDIDO* — ${BRAND.name}`);
  out.push("");
  out.push(`*Cliente:* ${o.customer.name.trim()}`);
  if (isWholesale && o.customer.business.trim()) {
    out.push(`*Estabelecimento:* ${o.customer.business.trim()}`);
  }
  out.push(`*Tipo de compra:* ${isWholesale ? "Atacado" : "Por unidade"}`);
  out.push("");
  out.push("*Itens*");
  for (const l of o.lines) {
    out.push(
      `• ${l.qty}x ${l.flavor.name} ${l.size.label} (${l.material.label.toLowerCase()}) — ${money(l.total)}`,
    );
  }
  out.push("");
  out.push(`*Total de potes:* ${o.units}`);

  if (o.receiving === "retirada") {
    out.push("*Recebimento:* Retirada (sem custo)");
  } else if (isWholesale) {
    out.push("*Recebimento:* Entrega grátis");
    out.push(`*Endereço:* ${o.customer.address.trim()}`);
  } else {
    out.push(
      `*Recebimento:* Entrega por ${RULES.unitDeliveryService} (frete por conta do cliente, a combinar)`,
    );
    out.push(`*Endereço:* ${o.customer.address.trim()}`);
  }

  out.push("");
  out.push(
    `*Total:* ${money(o.subtotal)}${
      o.receiving === "entrega" && !isWholesale ? " + frete" : ""
    }`,
  );

  if (o.customer.notes.trim()) {
    out.push("");
    out.push(`*Observações:* ${o.customer.notes.trim()}`);
  }

  out.push("");
  out.push(
    `Pedido de ${o.units} ${plural(o.units, "pote", "potes")} enviado pelo site. Aguardo a confirmação e a forma de pagamento. 🙏`,
  );

  return clean(out.join("\n"));
}

export function buildWhatsAppUrl(o: OrderData): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(buildMessage(o))}`;
}
