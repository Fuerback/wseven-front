"use client";

import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ExternalLink, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/products";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            title: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar checkout");
      }

      window.location.href = data.init_point;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar checkout"
      );
      setIsLoading(false);
    }
  }

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-green border-l border-green/30 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green/30">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-tan" />
            <h2 className="text-lg font-bold text-cream">
              Carrinho{" "}
              {totalItems > 0 && (
                <span className="text-cream/50 font-normal text-sm">
                  ({totalItems} {totalItems === 1 ? "item" : "itens"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="text-cream/60 hover:text-cream transition-colors p-1"
            aria-label="Fechar carrinho"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-cream/20" />
              <p className="text-cream/40 text-sm">
                Seu carrinho está vazio.
              </p>
              <button
                onClick={closeDrawer}
                className="text-tan hover:text-brown transition-colors text-sm font-medium"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-green/10 border border-green/20 rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-tan font-semibold text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-cream/40 text-xs mt-0.5">
                        {item.product.origin}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-cream/30 hover:text-red-400 transition-colors p-1"
                      aria-label={`Remover ${item.product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-green/30 flex items-center justify-center text-cream/60 hover:border-tan hover:text-tan transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-cream font-semibold text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-green/30 flex items-center justify-center text-cream/60 hover:border-tan hover:text-tan transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item total */}
                    <span className="text-tan font-bold text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="text-cream/30 hover:text-cream/60 transition-colors text-xs text-center mt-2"
              >
                Limpar carrinho
              </button>
            </div>
          )}
        </div>

        {/* Footer with total + checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-green/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-cream/60 text-sm">Total</span>
              <span className="text-2xl font-bold text-tan">
                {formatPrice(totalPrice)}
              </span>
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="bg-brown hover:bg-brown/80 disabled:opacity-60 disabled:cursor-not-allowed text-dark-green font-bold py-4 rounded-full text-center text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brown/20 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Finalizar Compra
                  <ExternalLink size={18} />
                </>
              )}
            </button>
            <p className="text-cream/30 text-xs text-center">
              Você será redirecionado ao Mercado Pago para pagamento seguro.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
