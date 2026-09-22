type Props = {
  value: number;
  onChange: (next: number) => void;
  label: string;
  max?: number;
};

/** Controle de quantidade: − / número editável / +. */
export default function Stepper({ value, onChange, label, max = 999 }: Props) {
  const set = (n: number) => onChange(Math.max(0, Math.min(max, n)));

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className="inline-flex shrink-0 items-center rounded-full border-2 border-forest-900/20 bg-white"
    >
      <button
        type="button"
        aria-label={`Diminuir ${label}`}
        disabled={value <= 0}
        onClick={() => set(value - 1)}
        className="grid h-11 w-11 place-items-center rounded-full text-2xl font-bold leading-none text-forest-900 transition hover:bg-butter-100 active:scale-90 disabled:cursor-not-allowed disabled:text-forest-900/25 disabled:hover:bg-transparent"
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`Quantidade de ${label}`}
        value={value}
        onFocus={(e) => e.target.select()}
        onChange={(e) => set(parseInt(e.target.value.replace(/\D/g, ""), 10) || 0)}
        className="w-11 bg-transparent text-center font-display text-lg font-bold tabular-nums text-forest-900"
      />
      <button
        type="button"
        aria-label={`Aumentar ${label}`}
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-2xl font-bold leading-none text-forest-950 transition hover:bg-gold-500 active:scale-90 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
