import Hero from "@/components/Hero";
import OrderBuilder from "@/components/OrderBuilder";
import { BRAND } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <Hero />
      <OrderBuilder />
      <footer className="border-t border-line px-5 py-10 text-center text-sm text-muted">
        <p className="font-display text-base font-semibold text-forest-900">{BRAND.name}</p>
        <p className="mt-1">{BRAND.instagram}</p>
      </footer>
    </>
  );
}
