import type { Customer, Mode, Receiving } from "@/lib/types";

type Props = {
  mode: Mode;
  receiving: Receiving;
  customer: Customer;
  onChange: (patch: Partial<Customer>) => void;
  errors: { name?: string; address?: string };
};

const input =
  "mt-1.5 w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-forest-900 placeholder:text-forest-900/40 transition focus:border-forest-900 focus:outline-none focus:ring-4 focus:ring-forest-700/20 aria-[invalid=true]:border-red-700";

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
      {text}
    </p>
  );
}

export default function CustomerForm({ mode, receiving, customer, onChange, errors }: Props) {
  return (
    <div className="grid gap-4">
      <div>
        <label htmlFor="campo-nome" className="font-display text-base font-bold">
          Seu nome
        </label>
        <input
          id="campo-nome"
          type="text"
          autoComplete="name"
          value={customer.name}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "erro-nome" : undefined}
          placeholder="Como podemos te chamar?"
          className={input}
        />
        <FieldError id="erro-nome" text={errors.name} />
      </div>

      {mode === "atacado" && (
        <div>
          <label htmlFor="campo-empresa" className="font-display text-base font-bold">
            Nome do estabelecimento <span className="font-sans text-sm font-normal text-muted">(opcional)</span>
          </label>
          <input
            id="campo-empresa"
            type="text"
            autoComplete="organization"
            value={customer.business}
            onChange={(e) => onChange({ business: e.target.value })}
            placeholder="Padaria, mercado, loja..."
            className={input}
          />
        </div>
      )}

      {receiving === "entrega" && (
        <div>
          <label htmlFor="campo-endereco" className="font-display text-base font-bold">
            Endereço de entrega
          </label>
          <textarea
            id="campo-endereco"
            rows={2}
            autoComplete="street-address"
            value={customer.address}
            onChange={(e) => onChange({ address: e.target.value })}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "erro-endereco" : undefined}
            placeholder="Rua, número, bairro e ponto de referência"
            className={input}
          />
          <FieldError id="erro-endereco" text={errors.address} />
        </div>
      )}

      <div>
        <label htmlFor="campo-obs" className="font-display text-base font-bold">
          Observações <span className="font-sans text-sm font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id="campo-obs"
          rows={2}
          value={customer.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Melhor horário, dúvidas, recado..."
          className={input}
        />
      </div>
    </div>
  );
}
