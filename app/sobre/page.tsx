import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Star, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre | W Seven Special Coffee",
  description:
    "Conheça a história da W Seven Special Coffee. Paixão por café especial de alta qualidade, cultivado nas melhores regiões de Minas Gerais.",
};

export default function SobrePage() {
  return (
    <div className="bg-dark-green min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-cream leading-tight">
                Nossa <span className="text-tan">História</span>
              </h1>
              <p className="text-cream/70 mt-6 text-lg leading-relaxed">
                A W Seven nasceu da paixão por café especial e do desejo de
                compartilhar o melhor que as terras mineiras podem oferecer. Cada
                grão que selecionamos carrega a história de uma região, o
                cuidado de produtores dedicados e o compromisso com a excelência.
              </p>
              <p className="text-cream/70 mt-4 text-lg leading-relaxed">
                Nosso nome carrega a tradição e a busca constante pela
                qualidade. &ldquo;High Quality Special Coffee&rdquo; não é
                apenas um slogan — é a promessa que fazemos em cada xícara.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-tan/20 rounded-full blur-3xl scale-125" />
                <Image
                  src="/logo.png"
                  alt="W Seven Special Coffee"
                  width={300}
                  height={300}
                  className="relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 border-y border-green/20 bg-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream">
              Nossos <span className="text-tan">Valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark-green border border-green/30 rounded-2xl p-6 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green/20 rounded-full flex items-center justify-center">
                <Star size={24} className="text-tan" />
              </div>
              <h3 className="text-tan font-semibold">Qualidade</h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                Selecionamos apenas grãos que atendem aos mais altos padrões de
                qualidade do café especial.
              </p>
            </div>

            <div className="bg-dark-green border border-green/30 rounded-2xl p-6 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green/20 rounded-full flex items-center justify-center">
                <Leaf size={24} className="text-tan" />
              </div>
              <h3 className="text-tan font-semibold">Sustentabilidade</h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                Respeitamos o meio ambiente e apoiamos práticas agrícolas
                sustentáveis em toda a cadeia produtiva.
              </p>
            </div>

            <div className="bg-dark-green border border-green/30 rounded-2xl p-6 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green/20 rounded-full flex items-center justify-center">
                <Users size={24} className="text-tan" />
              </div>
              <h3 className="text-tan font-semibold">Comunidade</h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                Valorizamos os produtores locais e construímos relações justas e
                duradouras com cada parceiro.
              </p>
            </div>

            <div className="bg-dark-green border border-green/30 rounded-2xl p-6 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green/20 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-tan" />
              </div>
              <h3 className="text-tan font-semibold">Paixão</h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                Cada etapa do nosso processo é guiada pela paixão em entregar o
                melhor café na sua xícara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream">
              De Minas para o <span className="text-tan">Mundo</span>
            </h2>
          </div>

          <div className="space-y-8 text-cream/70 text-lg leading-relaxed">
            <p>
              Minas Gerais é reconhecida mundialmente como uma das regiões mais
              importantes para a produção de café. Com altitudes elevadas, clima
              ameno e solo fértil, o estado reúne as condições perfeitas para o
              cultivo de grãos excepcionais.
            </p>
            <p>
              Na W Seven, trabalhamos diretamente com produtores do{" "}
              <strong className="text-tan">Cerrado Mineiro</strong> e das{" "}
              <strong className="text-tan">Montanhas de Minas</strong>, duas
              regiões que dão origem aos nossos dois cafés: o{" "}
              <strong className="text-tan">Café do Serrado</strong>, encorpado e
              com notas de chocolate, e o{" "}
              <strong className="text-tan">Café da Montanha</strong>, com acidez
              brilhante e notas frutadas.
            </p>
            <p>
              Nosso compromisso é levar até você a experiência autêntica do café
              mineiro, com rastreabilidade, qualidade e o carinho que só um café
              verdadeiramente especial pode oferecer.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-brown hover:bg-brown/80 text-dark-green font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-brown/20"
            >
              Conheça Nossos Cafés
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
