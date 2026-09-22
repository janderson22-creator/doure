import { money, plural } from "@/lib/format";

type Props = { units: number; subtotal: number };

/** Barra fixa no celular: mostra o total e leva ao resumo. */
export default function StickyBar({ units, subtotal }: Props) {
  if (units === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-forest-700 bg-forest-900 px-4 py-3 text-butter-50 lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div>
          <p className="text-sm text-butter-200">
            {units} {plural(units, "pote", "potes")}
          </p>
          <p className="font-display text-xl font-extrabold tabular-nums">{money(subtotal)}</p>
        </div>
        <a
          href="#resumo"
          className="inline-flex h-12 items-center rounded-full bg-gold-400 px-6 font-display font-bold text-forest-950 transition active:scale-95"
        >
          Revisar pedido
        </a>
      </div>
    </div>
  );
}
