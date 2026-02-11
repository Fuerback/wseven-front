import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagamento Aprovado | W Seven Special Coffee",
  description: "Seu pagamento foi aprovado com sucesso. Obrigado por escolher W Seven Special Coffee!",
};

export default function SuccessPage() {
  return (
    <div className="bg-dark-green min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green/20 rounded-full flex items-center justify-center">
            <CheckCircle size={56} className="text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-4">
          Pagamento <span className="text-tan">Aprovado!</span>
        </h1>

        <p className="text-cream/70 text-lg leading-relaxed mb-4">
          Obrigado por sua compra! Seu pedido foi confirmado com sucesso.
        </p>

        <p className="text-cream/50 text-sm leading-relaxed mb-10">
          Você receberá um e-mail de confirmação com os detalhes do pedido e as
          informações de entrega. Agradecemos por escolher a W Seven Special
          Coffee!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brown hover:bg-brown/80 text-dark-green font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-brown/20"
        >
          <Home size={20} />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
