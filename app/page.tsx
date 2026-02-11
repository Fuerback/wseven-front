"use client";

import Link from "next/link";
import { Leaf, Mountain, ArrowRight } from "lucide-react";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import { products } from "./lib/products";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Products Preview */}
      <section className="bg-dark-green py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream">
              Nossos <span className="text-tan">Cafés</span>
            </h2>
            <p className="text-cream/60 mt-4 max-w-xl mx-auto">
              Selecionamos os melhores grãos das regiões mais nobres de Minas
              Gerais para trazer até você uma experiência única.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 text-tan hover:text-brown transition-colors font-medium"
            >
              Ver todos os produtos
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-green/10 py-20 border-y border-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream">
              Por que <span className="text-tan">W Seven</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center gap-4 p-6">
              <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center">
                <Leaf size={28} className="text-green" />
              </div>
              <h3 className="text-lg font-semibold text-tan">
                Cultivo Sustentável
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                Práticas agrícolas responsáveis que respeitam o meio ambiente e
                valorizam as comunidades locais.
              </p>
            </div>

            <div className="text-center flex flex-col items-center gap-4 p-6">
              <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center">
                <Mountain size={28} className="text-green" />
              </div>
              <h3 className="text-lg font-semibold text-tan">
                Terroir Mineiro
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                Grãos selecionados de regiões com altitude, clima e solo ideais
                para cafés especiais.
              </p>
            </div>

            <div className="text-center flex flex-col items-center gap-4 p-6">
              <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-tan">
                Torra Artesanal
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                Cada lote é torrado com precisão para extrair o melhor perfil de
                sabor de cada origem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-green py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-4">
            Conheça Nossa <span className="text-tan">História</span>
          </h2>
          <p className="text-cream/60 mb-8 max-w-xl mx-auto">
            Descubra como nasceu a W Seven e nossa paixão por entregar cafés
            especiais de altíssima qualidade.
          </p>
          <Link
            href="/sobre"
            className="inline-flex items-center gap-2 bg-tan/20 hover:bg-tan/30 text-tan font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-tan/30"
          >
            Saiba Mais
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
