import Link from "next/link";
import Image from "next/image";
import { Coffee, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-green border-t border-green/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_green.png"
                alt="W Seven Special Coffee"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-tan font-semibold text-lg">W Seven</span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed">
              Café especial de alta qualidade, cultivado com dedicação e paixão
              nas melhores regiões produtoras do Brasil.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-tan font-semibold text-sm uppercase tracking-wider">
              Navegação
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-cream/60 hover:text-tan transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                href="/produtos"
                className="text-cream/60 hover:text-tan transition-colors text-sm"
              >
                Produtos
              </Link>
              <Link
                href="/sobre"
                className="text-cream/60 hover:text-tan transition-colors text-sm"
              >
                Sobre
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-tan font-semibold text-sm uppercase tracking-wider">
              Contato
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <Mail size={16} className="text-green" />
                <span>contato@wseven.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <MapPin size={16} className="text-green" />
                <span>Florianópolis, Santa Catarina, Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <Coffee size={16} className="text-green" />
                <span>Café Especial desde 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-green/20 text-center">
          <p className="text-cream/40 text-sm">
            &copy; {new Date().getFullYear()} W Seven Special Coffee. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
