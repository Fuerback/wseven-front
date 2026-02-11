import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagamento Pendente | W Seven Special Coffee",
  description: "Seu pagamento está sendo processado. Em breve você receberá a confirmação.",
};

export default function PendingPage() {
  return (
    <div className="bg-dark-green min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <Clock size={56} className="text-yellow-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-4">
          Pagamento <span className="text-yellow-400">Pendente</span>
        </h1>

        <p className="text-cream/70 text-lg leading-relaxed mb-4">
          Seu pagamento está sendo processado e aguarda confirmação.
        </p>

        <p className="text-cream/50 text-sm leading-relaxed mb-10">
          Isso é comum para pagamentos via boleto ou Pix. Assim que o pagamento
          for confirmado, você receberá um e-mail com os detalhes do pedido.
          Fique tranquilo, estamos acompanhando tudo!
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
