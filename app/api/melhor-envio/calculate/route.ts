export const runtime = 'edge';

import { NextResponse } from "next/server";

interface CalculateRequest {
  postal_code: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { postal_code, quantity } = (await request.json()) as CalculateRequest;

    if (!postal_code || postal_code.replace(/\D/g, "").length !== 8) {
      return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
    }

    if (!quantity || quantity <= 0) {
      return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
    }

    const token = process.env.MELHOR_ENVIO_TOKEN;
    const baseUrl = process.env.MELHOR_ENVIO_URL || "https://sandbox.melhorenvio.com.br";
    const originCep = process.env.ORIGIN_CEP;

    const body = {
      from: {
        postal_code: originCep,
      },
      to: {
        postal_code: postal_code.replace(/\D/g, ""),
      },
      products: [
        {
          id: "Cafe",
          width: 11,
          height: 17,
          length: 11,
          weight: 0.25 * quantity,
          quantity,
        },
      ],
      options: {
        receipt: false,
        own_hand: false,
      },
      services: "1,2,3,4",
    };

    const response = await fetch(`${baseUrl}/api/v2/me/shipment/calculate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Wseven (contato@wsevencoffee.com)",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Melhor Envio API error:", errorText);
      return NextResponse.json(
        { error: "Erro ao calcular frete" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const options = Array.isArray(data)
      ? data.filter((option) => option.price != null && !option.error)
      : [];

    return NextResponse.json(options);
  } catch (error) {
    console.error("Erro ao calcular frete:", error);
    return NextResponse.json(
      { error: "Erro ao calcular frete" },
      { status: 500 }
    );
  }
}
