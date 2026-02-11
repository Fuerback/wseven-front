"use client";

import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export default function ProdutosPage() {
  return (
    <div className="bg-dark-green min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-cream">
            Nossos <span className="text-tan">Produtos</span>
          </h1>
          <p className="text-cream/60 mt-4 max-w-2xl mx-auto text-lg">
            Cada café W Seven é cuidadosamente selecionado e torrado para
            oferecer uma experiência sensorial única. Escolha o seu favorito e
            adicione ao carrinho.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How to buy */}
      <section className="pb-20 border-t border-green/20 pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">
            Como <span className="text-tan">Comprar</span>
          </h2>
          <p className="text-cream/60 mb-10 max-w-xl mx-auto">
            Comprar seu café W Seven é simples e seguro. Veja como funciona:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center text-dark-green font-bold text-lg">
                1
              </div>
              <h3 className="text-tan font-semibold">Escolha seu café</h3>
              <p className="text-cream/50 text-sm">
                Selecione entre nossas opções de café especial.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center text-dark-green font-bold text-lg">
                2
              </div>
              <h3 className="text-tan font-semibold">Adicione ao carrinho</h3>
              <p className="text-cream/50 text-sm">
                Escolha a quantidade desejada e adicione ao seu carrinho de
                compras.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center text-dark-green font-bold text-lg">
                3
              </div>
              <h3 className="text-tan font-semibold">Finalize no Mercado Pago</h3>
              <p className="text-cream/50 text-sm">
                Clique em "Finalizar Compra" no carrinho e pague com Pix, cartão
                ou boleto de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
