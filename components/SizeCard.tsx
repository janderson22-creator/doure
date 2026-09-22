import Image from "next/image";
import { FLAVORS } from "@/lib/catalog";
import { money } from "@/lib/format";
import { cartKey, materialsFor, unitPrice } from "@/lib/pricing";
import type { Cart, Mode, Size } from "@/lib/types";
import Stepper from "./Stepper";

type Props = {
  size: Size;
  mode: Mode;
  cart: Cart;
  materialId: string;
  onMaterial: (materialId: string) => void;
  onQty: (key: string, qty: number) => void;
};

export default function SizeCard({ size, mode, cart, materialId, onMaterial, onQty }: Props) {
  const materials = materialsFor(size, mode);
  const inThisCard = FLAVORS.reduce(
    (sum, f) => sum + (cart[cartKey(size.id, materialId, f.id)] ?? 0),
    0,
  );

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white">
      <div className="grid sm:grid-cols-[190px_1fr]">
        <div className="relative flex items-end justify-center bg-butter-100 px-6 pt-6 sm:items-center sm:pb-6">
          <Image
            src={size.image}
            alt={`Pote de ghee de ${size.label}`}
            width={240}
            height={280}
            unoptimized
            className="h-auto w-36 sm:w-full"
          />
          {inThisCard > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-forest-900 px-3 py-1 text-sm font-bold text-butter-50">
              {inThisCard} no pedido
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-display text-2xl font-extrabold tracking-tight">
            Pote de {size.label}
          </h3>

          {/* Material */}
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-muted">Tipo de pote</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {materials.map((m) => (
                <label
                  key={m.id}
                  className="cursor-pointer rounded-xl border-2 border-line px-3 py-2.5 transition has-checked:border-forest-900 has-checked:bg-butter-100 has-focus-visible:ring-4 has-focus-visible:ring-forest-700/30"
                >
                  <input
                    type="radio"
                    name={`material-${size.id}`}
                    checked={materialId === m.id}
                    onChange={() => onMaterial(m.id)}
                    className="sr-only"
                  />
                  <span className="block font-display text-base font-bold leading-tight">
                    {m.label}
                  </span>
                  <span className="block text-lg font-extrabold tabular-nums text-gold-800">
                    {money(size.prices[mode][m.id])}
                  </span>
                  <span className="block text-xs leading-snug text-muted">{m.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sabores */}
          <ul className="mt-5 divide-y divide-line">
            {FLAVORS.map((flavor) => {
              const key = cartKey(size.id, materialId, flavor.id);
              const qty = cart[key] ?? 0;
              const price = unitPrice(size, materialId, flavor, mode);
              if (price === undefined) return null;
              return (
                <li key={flavor.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-4 w-4 shrink-0 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: flavor.color, boxShadow: `0 0 0 1px ${flavor.color}` }}
                    />
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold leading-tight">
                        {flavor.name}
                        {flavor.priceExtra ? (
                          <span className="ml-2 text-sm font-semibold text-muted">
                            {money(price)}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm leading-snug text-muted">{flavor.description}</p>
                    </div>
                  </div>
                  <Stepper
                    value={qty}
                    onChange={(n) => onQty(key, n)}
                    label={`${flavor.name} ${size.label}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
