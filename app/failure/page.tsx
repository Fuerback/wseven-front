import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagamento Não Aprovado | W Seven Special Coffee",
  description: "Houve um problema com seu pagamento. Tente novamente ou entre em contato conosco.",
};

export default function FailurePage() {
  return (
    <div className="bg-dark-green min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
            <XCircle size={56} className="text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-cream mb-4">
          Pagamento <span className="text-red-400">Não Aprovado</span>
        </h1>

        <p className="text-cream/70 text-lg leading-relaxed mb-4">
          Infelizmente, não foi possível processar seu pagamento.
        </p>

        <p className="text-cream/50 text-sm leading-relaxed mb-10">
          Isso pode acontecer por diversos motivos, como dados do cartão
          incorretos, saldo insuficiente ou limite excedido. Verifique as
          informações e tente novamente, ou escolha outro meio de pagamento.
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
