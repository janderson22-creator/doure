import { RULES } from "@/lib/catalog";
import { money, plural } from "@/lib/format";
import type { CartLine, Mode, Receiving } from "@/lib/types";

type Props = {
  mode: Mode;
  receiving: Receiving;
  lines: CartLine[];
  units: number;
  subtotal: number;
  submitted: boolean;
  itemsError?: string;
  onSend: () => void;
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C8.83 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.8c-1.95 0-3.86-.53-5.53-1.52l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.77 10.77 0 0 1 5.2 16c0-5.96 4.86-10.8 10.82-10.8S26.8 10.04 26.8 16c0 5.95-4.86 10.8-10.78 10.8Zm5.92-8.08c-.32-.16-1.92-.95-2.22-1.06-.3-.1-.52-.16-.73.16-.22.32-.84 1.06-1.03 1.28-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.6-1.91-1.8-2.23-.18-.32-.02-.5.14-.66.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.52-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.3 3.32.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.47.2 2.02.12.62-.09 1.92-.78 2.19-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  );
}

export default function OrderSummary({
  mode,
  receiving,
  lines,
  units,
  subtotal,
  submitted,
  itemsError,
  onSend,
}: Props) {
  const isWholesale = mode === "atacado";
  const min = RULES.wholesaleMinUnits;
  const missing = Math.max(0, min - units);

  const deliveryText =
    receiving === "retirada"
      ? "Retirada, sem custo"
      : isWholesale
        ? "Entrega grátis"
        : `${RULES.unitDeliveryService}, frete por sua conta`;

  return (
    <section
      id="resumo"
      aria-labelledby="titulo-resumo"
      className="rounded-3xl border-2 border-forest-900 bg-white p-5 sm:p-6"
    >
      <h2 id="titulo-resumo" className="font-display text-2xl font-extrabold tracking-tight">
        Seu pedido
      </h2>

      {lines.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-butter-100 p-4 text-sm leading-relaxed text-forest-700">
          Nenhum pote por aqui ainda. Escolha tamanhos e sabores para ver o total.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {lines.map((l) => (
            <li key={l.key} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="font-display text-base font-bold leading-tight">
                  {l.qty}x {l.flavor.name} {l.size.label}
                </p>
                <p className="text-sm text-muted">
                  {l.material.label}, {money(l.unitPrice)} cada
                </p>
              </div>
              <p className="shrink-0 font-bold tabular-nums">{money(l.total)}</p>
            </li>
          ))}
        </ul>
      )}

      {isWholesale && (
        <div className="mt-4" aria-live="polite">
          <div className="h-2.5 overflow-hidden rounded-full bg-butter-200">
            <div
              className="h-full rounded-full bg-forest-700 transition-[width] duration-300"
              style={{ width: `${Math.min(100, (units / min) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-forest-700">
            {missing > 0
              ? `Faltam ${missing} ${plural(missing, "pote", "potes")} para o mínimo do atacado (${min}).`
              : "Você atingiu o mínimo do atacado."}
          </p>
        </div>
      )}

      <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{units} {plural(units, "pote", "potes")}</dt>
          <dd className="font-semibold tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Recebimento</dt>
          <dd className="text-right font-semibold">{deliveryText}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 pt-2">
          <dt className="font-display text-lg font-bold">Total</dt>
          <dd className="font-display text-3xl font-extrabold tabular-nums">{money(subtotal)}</dd>
        </div>
        {receiving === "entrega" && !isWholesale && (
          <p className="text-right text-xs text-muted">+ frete do {RULES.unitDeliveryService}</p>
        )}
      </dl>

      {submitted && itemsError && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {itemsError}
        </p>
      )}

      <button
        type="button"
        onClick={onSend}
        className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-forest-900 px-6 font-display text-lg font-bold text-butter-50 transition hover:bg-forest-700 active:scale-[0.98]"
      >
        <WhatsAppIcon />
        Enviar pedido pelo WhatsApp
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
        O WhatsApp abre com a mensagem pronta. É só conferir e enviar. O pagamento a gente combina na conversa.
      </p>
    </section>
  );
}
