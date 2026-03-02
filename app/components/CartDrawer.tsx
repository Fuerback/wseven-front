"use client";

import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, Loader2, Truck, ChevronRight } from "lucide-react";
import { useCart, type ShippingOption } from "../context/CartContext";
import { formatPrice } from "../lib/products";
import MercadoPagoButton from "./MercadoPagoButton";
import CheckoutForm, { type CustomerData } from "./CheckoutForm";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotalPrice,
    totalPrice,
    selectedShipping,
    setShipping,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const [step, setStep] = useState<"cart" | "form" | "payment">("cart");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const [shippingCep, setShippingCep] = useState("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [shippingCalculated, setShippingCalculated] = useState(false);

  function handleShippingCepChange(value: string) {
    let masked = value.replace(/\D/g, "");
    if (masked.length > 8) masked = masked.slice(0, 8);
    if (masked.length > 5) masked = masked.slice(0, 5) + "-" + masked.slice(5);
    setShippingCep(masked);
    if (shippingCalculated) {
      setShippingCalculated(false);
      setShippingOptions([]);
      setShipping(null);
    }
  }

  async function handleCalculateShipping() {
    const cleanCep = shippingCep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setShippingError("Digite um CEP válido");
      return;
    }
    setShippingLoading(true);
    setShippingError(null);
    setShippingOptions([]);
    setShipping(null);

    try {
      const response = await fetch("/api/melhor-envio/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postal_code: cleanCep, quantity: totalItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao calcular frete");
      }

      if (!Array.isArray(data) || data.length === 0) {
        setShippingError("Nenhuma opção de frete disponível para este CEP");
        return;
      }

      setShippingOptions(data);
      setShippingCalculated(true);
    } catch (err) {
      setShippingError(err instanceof Error ? err.message : "Erro ao calcular frete");
    } finally {
      setShippingLoading(false);
    }
  }

  async function handleFormSubmit(customer: CustomerData) {
    setIsLoading(true);
    setError(null);
    setPreferenceId(null);

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
          customer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar checkout");
      }

      setPreferenceId(data.id);
      setStep("payment");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar checkout"
      );
    } finally {
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
        {/* Form step */}
        {step === "form" && (
          <CheckoutForm
            onSubmit={handleFormSubmit}
            onBack={() => setStep("cart")}
            isLoading={isLoading}
            lockedCep={shippingCep || undefined}
          />
        )}

        {/* Payment step */}
        {step === "payment" && preferenceId && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-green/30">
              <h2 className="text-lg font-bold text-cream">Pagamento</h2>
              <button
                onClick={() => { setStep("cart"); setPreferenceId(null); }}
                className="text-cream/60 hover:text-cream transition-colors p-1"
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              <p className="text-cream/60 text-sm text-center">
                Clique no botão abaixo para finalizar o pagamento com Mercado Pago.
              </p>
              <MercadoPagoButton preferenceId={preferenceId} />
            </div>
          </>
        )}

        {/* Cart step */}
        {step === "cart" && (
          <>
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

              {/* Shipping simulator */}
              <div className="flex flex-col gap-2 border-t border-green/20 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <Truck size={15} className="text-tan" />
                  <span className="text-cream/70 text-xs font-medium">Calcular frete</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shippingCep}
                    onChange={(e) => handleShippingCepChange(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1 bg-green/10 border border-green/30 rounded-lg px-3 py-2 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-tan/60 transition-colors"
                  />
                  <button
                    onClick={handleCalculateShipping}
                    disabled={shippingLoading}
                    className="bg-green/20 hover:bg-green/30 disabled:opacity-60 border border-green/30 text-cream text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {shippingLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                    {shippingLoading ? "" : "Calcular"}
                  </button>
                </div>
                {shippingError && (
                  <p className="text-red-400 text-xs">{shippingError}</p>
                )}

                {/* Shipping options */}
                {shippingCalculated && shippingOptions.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    {shippingOptions.map((option) => {
                      const isSelected = selectedShipping?.id === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setShipping(isSelected ? null : option)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-tan/15 border-tan/60 text-cream"
                              : "bg-green/10 border-green/20 text-cream/80 hover:border-green/50"
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold">
                              {option.company.name} — {option.name}
                            </span>
                            <span className="text-cream/50 text-xs">
                              {option.delivery_time} {option.delivery_time === 1 ? "dia útil" : "dias úteis"}
                            </span>
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? "text-tan" : "text-cream/80"}`}>
                            {formatPrice(parseFloat(option.price))}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer: totals + checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-green/30 flex flex-col gap-3">

            {/* Totals */}
            {selectedShipping ? (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-cream/50 text-sm">Subtotal</span>
                  <span className="text-cream/70 text-sm">{formatPrice(subtotalPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cream/50 text-sm">Frete</span>
                  <span className="text-cream/70 text-sm">{formatPrice(parseFloat(selectedShipping.price))}</span>
                </div>
                <div className="flex items-center justify-between border-t border-green/20 pt-1.5 mt-0.5">
                  <span className="text-cream/60 text-sm">Total</span>
                  <span className="text-2xl font-bold text-tan">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-cream/60 text-sm">Total</span>
                <span className="text-2xl font-bold text-tan">{formatPrice(totalPrice)}</span>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            <button
              onClick={() => setStep("form")}
              disabled={!selectedShipping}
              className="bg-brown hover:bg-brown/80 disabled:opacity-40 disabled:cursor-not-allowed text-dark-green font-bold py-4 rounded-full text-center text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brown/20 cursor-pointer"
            >
              Finalizar Compra
            </button>
            {!selectedShipping && (
              <p className="text-cream/40 text-xs text-center">
                Calcule e selecione uma opção de frete para continuar.
              </p>
            )}
            {selectedShipping && (
              <p className="text-cream/30 text-xs text-center">
                Você será redirecionado ao Mercado Pago para pagamento seguro.
              </p>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </>
  );
}
