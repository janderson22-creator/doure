"use client";

import { useMemo, useState, type ReactNode } from "react";
import { BRAND, MODES, RULES, SIZES } from "@/lib/catalog";
import { money } from "@/lib/format";
import { buildLines, fromPrice, materialsFor, totals } from "@/lib/pricing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Cart, Customer, Mode, Receiving } from "@/lib/types";
import ChoiceCard from "./ChoiceCard";
import CustomerForm from "./CustomerForm";
import OrderSummary from "./OrderSummary";
import SizeCard from "./SizeCard";
import StickyBar from "./StickyBar";

function Step({
  n,
  title,
  hint,
  id,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-4">
      <div className="mb-4 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400 font-display text-lg font-extrabold text-forest-950"
        >
          {n}
        </span>
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
            {title}
          </h2>
          {hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function OrderBuilder() {
  const [mode, setMode] = useState<Mode>("unidade");
  const [cart, setCart] = useState<Cart>({});
  const [materialBySize, setMaterialBySize] = useState<Record<string, string>>({});
  const [receiving, setReceiving] = useState<Receiving>("retirada");
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    business: "",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isWholesale = mode === "atacado";
  const lines = useMemo(() => buildLines(cart, mode), [cart, mode]);
  const { units, subtotal } = totals(lines);

  const errors = {
    items:
      units === 0
        ? "Escolha pelo menos um pote para continuar."
        : isWholesale && units < RULES.wholesaleMinUnits
          ? `O atacado começa em ${RULES.wholesaleMinUnits} potes. Faltam ${RULES.wholesaleMinUnits - units}.`
          : undefined,
    name: customer.name.trim() ? undefined : "Informe seu nome.",
    address:
      receiving === "entrega" && !customer.address.trim()
        ? "Informe o endereço de entrega."
        : undefined,
  };

  /** Material selecionado no cartão do tamanho (com fallback se o modo mudar). */
  const selectedMaterial = (sizeId: string) => {
    const size = SIZES.find((s) => s.id === sizeId)!;
    const available = materialsFor(size, mode);
    const chosen = materialBySize[sizeId];
    return available.find((m) => m.id === chosen)?.id ?? available[0]?.id ?? "";
  };

  const setQty = (key: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty > 0) next[key] = qty;
      else delete next[key];
      return next;
    });

  function focusTarget(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.focus({ preventScroll: true });
    }
  }

  function handleSend() {
    setSubmitted(true);
    const firstError = errors.items
      ? "secao-produtos"
      : errors.name
        ? "campo-nome"
        : errors.address
          ? "campo-endereco"
          : null;
    if (firstError) {
      focusTarget(firstError);
      return;
    }
    const url = buildWhatsAppUrl({ mode, receiving, lines, units, subtotal, customer });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const showErrors = submitted;

  return (
    <main id="pedido" className="mx-auto max-w-6xl px-5 pb-28 pt-12 lg:pb-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
        <div className="space-y-12">
          {/* 1. Tipo de compra */}
          <Step n={1} title="Como você quer comprar?">
            <div className="grid gap-3 sm:grid-cols-2">
              {MODES.map((m) => (
                <ChoiceCard
                  key={m.id}
                  name="modo"
                  checked={mode === m.id}
                  onChange={() => {
                    setMode(m.id);
                    setSubmitted(false);
                  }}
                  title={m.title}
                  description={m.description}
                  tag={m.id === "atacado" ? "Entrega grátis" : undefined}
                >
                  <span className="mt-2 block text-sm font-semibold text-gold-800">
                    a partir de {money(fromPrice(m.id))} o pote
                  </span>
                </ChoiceCard>
              ))}
            </div>
          </Step>

          {/* 2. Produtos */}
          <Step
            n={2}
            id="secao-produtos"
            title="Escolha os potes"
            hint="Você pode misturar tamanhos, sabores e tipos de pote no mesmo pedido."
          >
            <div className="space-y-5">
              {SIZES.map((size) => (
                <SizeCard
                  key={size.id}
                  size={size}
                  mode={mode}
                  cart={cart}
                  materialId={selectedMaterial(size.id)}
                  onMaterial={(id) => setMaterialBySize((p) => ({ ...p, [size.id]: id }))}
                  onQty={setQty}
                />
              ))}
            </div>
            {showErrors && errors.items && (
              <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
                {errors.items}
              </p>
            )}
          </Step>

          {/* 3. Recebimento */}
          <Step n={3} title="Retirar ou receber?">
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard
                name="recebimento"
                checked={receiving === "retirada"}
                onChange={() => setReceiving("retirada")}
                title="Retirar"
                description={BRAND.pickupNote}
                tag="Sem custo"
              />
              <ChoiceCard
                name="recebimento"
                checked={receiving === "entrega"}
                onChange={() => setReceiving("entrega")}
                title={isWholesale ? "Entrega grátis" : `Entrega por ${RULES.unitDeliveryService}`}
                description={
                  isWholesale
                    ? "Levamos o lote até o seu estabelecimento."
                    : "O frete é calculado no app e pago por você. Combinamos pelo WhatsApp."
                }
                tag={isWholesale ? "Grátis" : undefined}
              />
            </div>
          </Step>

          {/* 4. Dados */}
          <Step n={4} title="Seus dados" hint="Só o necessário para montar o pedido.">
            <CustomerForm
              mode={mode}
              receiving={receiving}
              customer={customer}
              onChange={(patch) => setCustomer((c) => ({ ...c, ...patch }))}
              errors={{
                name: showErrors ? errors.name : undefined,
                address: showErrors ? errors.address : undefined,
              }}
            />
          </Step>
        </div>

        <aside className="mt-12 lg:sticky lg:top-6 lg:mt-0">
          <OrderSummary
            mode={mode}
            receiving={receiving}
            lines={lines}
            units={units}
            subtotal={subtotal}
            submitted={submitted}
            itemsError={errors.items}
            onSend={handleSend}
          />
        </aside>
      </div>

      <StickyBar units={units} subtotal={subtotal} />
    </main>
  );
}
