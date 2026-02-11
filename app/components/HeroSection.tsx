import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-dark-green overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brown rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tan rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8 py-20">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-tan/20 rounded-full blur-2xl scale-150" />
          <Image
            src="/logo.png"
            alt="W Seven Special Coffee"
            width={220}
            height={220}
            className="relative z-10 drop-shadow-2xl"
            priority
          />
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            Café Especial de
            <span className="block text-tan">Alta Qualidade</span>
          </h1>
          <p className="text-cream/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Cultivado com dedicação nas melhores regiões do Brasil, nosso café
            carrega a essência da terra e o cuidado artesanal em cada grão.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/produtos"
            className="bg-brown hover:bg-brown/80 text-dark-green font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-brown/20"
          >
            Ver Produtos
          </Link>
          <Link
            href="/sobre"
            className="border-2 border-tan/50 hover:border-tan text-tan font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Nossa História
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-green/30 w-full max-w-lg">
          <div className="text-center">
            <p className="text-3xl font-bold text-tan">100%</p>
            <p className="text-cream/50 text-sm mt-1">Arábica</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-tan">2</p>
            <p className="text-cream/50 text-sm mt-1">Origens</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-tan">MG</p>
            <p className="text-cream/50 text-sm mt-1">Brasil</p>
          </div>
        </div>
      </div>
    </section>
  );
}
