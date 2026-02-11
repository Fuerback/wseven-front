"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-green/95 backdrop-blur-sm border-b border-green/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="W Seven Special Coffee"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-tan font-semibold text-xl hidden sm:block">
                W Seven
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/80 hover:text-tan transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/produtos"
                className="bg-brown hover:bg-brown/80 text-dark-green font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Comprar Agora
              </Link>
              <button
                onClick={openDrawer}
                className="relative text-cream/80 hover:text-tan transition-colors p-2"
                aria-label="Abrir carrinho"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brown text-dark-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile right side */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={openDrawer}
                className="relative text-cream/80 hover:text-tan transition-colors p-2"
                aria-label="Abrir carrinho"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brown text-dark-green text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-cream p-2"
                aria-label="Menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <nav className="md:hidden pb-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream/80 hover:text-tan transition-colors text-sm font-medium uppercase tracking-wider py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/produtos"
                onClick={() => setMenuOpen(false)}
                className="bg-brown hover:bg-brown/80 text-dark-green font-semibold px-5 py-2.5 rounded-full text-sm transition-colors text-center"
              >
                Comprar Agora
              </Link>
            </nav>
          )}
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
