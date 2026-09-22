import Image from "next/image";
import { BRAND } from "@/lib/catalog";

export default function Hero() {
  return (
    <header className="overflow-hidden bg-butter-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-4 md:pb-16 md:pt-12">
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-forest-700">
            {BRAND.name}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-forest-950 sm:text-5xl md:text-6xl">
            Ghee artesanal do nosso fogão para a sua mesa
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-700">
            {BRAND.tagline} Escolha o pote, o sabor e mande o pedido pelo
            WhatsApp em poucos toques.
          </p>
          <a
            href="#pedido"
            className="mt-7 inline-flex h-14 items-center rounded-full bg-forest-900 px-8 font-display text-lg font-bold text-butter-50 transition hover:bg-forest-700 active:scale-[0.98]"
          >
            Fazer meu pedido
          </a>
        </div>

        {/* Os potes sobre um "sol" dourado: o momento mais marcante da página */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[440px]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-gold-400" />
          <div className="absolute inset-[9%] rounded-full bg-gold-300" />
          <div className="absolute inset-[20%] rounded-full bg-butter-200" />
          <div className="hero-jar absolute bottom-[10%] left-[9%] w-[50%]">
            <Image
              src="/images/pote-300.svg"
              alt=""
              width={240}
              height={280}
              unoptimized
              priority
              className="h-auto w-full drop-shadow-[0_14px_18px_rgba(20,41,28,0.25)]"
            />
          </div>
          <div className="hero-jar hero-jar-late absolute bottom-[7%] right-[8%] w-[40%]">
            <Image
              src="/images/pote-190.svg"
              alt=""
              width={240}
              height={280}
              unoptimized
              priority
              className="h-auto w-full drop-shadow-[0_14px_18px_rgba(20,41,28,0.25)]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
