import type { ReactNode } from "react";

type Props = {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  tag?: string;
  children?: ReactNode;
};

/** Cartão de escolha única (rádio acessível, com o cartão inteiro clicável). */
export default function ChoiceCard({
  name,
  checked,
  onChange,
  title,
  description,
  tag,
  children,
}: Props) {
  return (
    <label className="group relative flex cursor-pointer gap-3 rounded-2xl border-2 border-line bg-white p-4 transition has-checked:border-forest-900 has-checked:bg-butter-100 has-focus-visible:ring-4 has-focus-visible:ring-forest-700/30">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-forest-700/40 bg-white group-has-checked:border-forest-900 group-has-checked:bg-forest-900"
      >
        <span className="h-2 w-2 rounded-full bg-butter-50 opacity-0 group-has-checked:opacity-100" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-lg font-bold leading-tight">{title}</span>
          {tag && (
            <span className="rounded-full bg-herb-100 px-2.5 py-0.5 text-xs font-bold text-herb-500 group-has-checked:bg-white">
              {tag}
            </span>
          )}
        </span>
        {description && (
          <span className="mt-1 block text-sm leading-snug text-muted">{description}</span>
        )}
        {children}
      </span>
    </label>
  );
}
