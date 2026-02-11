"use client";

import { Coffee, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../lib/products";
import { formatPrice } from "../lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="bg-dark-green border border-green/30 rounded-2xl overflow-hidden hover:border-tan/50 transition-all duration-300 group">
      {/* Image placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-green/20 to-brown/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/60 to-transparent" />
        <Coffee
          size={80}
          className="text-tan/40 group-hover:text-tan/60 transition-colors duration-300"
        />
        <span className="absolute top-4 right-4 bg-brown text-dark-green text-xs font-bold px-3 py-1 rounded-full uppercase">
          {product.origin}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-tan">{product.name}</h3>
          <p className="text-cream/60 text-sm mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-cream/40 text-xs uppercase tracking-wider">
            Notas:
          </span>
          <span className="text-cream/70 text-sm">{product.notes}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-green/20">
          <span className="text-2xl font-bold text-tan">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-brown hover:bg-brown/80 text-dark-green font-bold px-6 py-3 rounded-full text-sm transition-colors flex items-center gap-2 shadow-lg shadow-brown/10 cursor-pointer"
          >
            Adicionar
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
