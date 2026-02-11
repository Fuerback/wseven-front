"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useRef } from "react";

interface MercadoPagoButtonProps {
  preferenceId: string;
}

export default function MercadoPagoButton({ preferenceId }: MercadoPagoButtonProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
        locale: "pt-BR",
      });
      initialized.current = true;
    }
  }, []);

  return (
    <div className="w-full">
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
}
