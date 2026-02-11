export const runtime = 'edge';

import { NextResponse } from "next/server";

interface CartItemRequest {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

interface CustomerRequest {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

export async function POST(request: Request) {
  try {
    const { items, customer } = (await request.json()) as {
      items: CartItemRequest[];
      customer: CustomerRequest;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.trim() || "http://localhost:3000";

    const [firstName, ...lastParts] = (customer?.name || "").trim().split(" ");
    const lastName = lastParts.join(" ") || firstName;

    const preferenceBody = {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "BRL",
      })),
      payer: {
        name: firstName,
        surname: lastName,
        email: customer?.email,
        address: {
          zip_code: customer?.cep?.replace(/\D/g, ""),
          street_name: customer?.street,
          street_number: customer?.number || "0",
        },
      },
      metadata: {
        customer_name: customer?.name,
        customer_email: customer?.email,
        customer_cep: customer?.cep,
        customer_street: customer?.street,
        customer_number: customer?.number,
        customer_complement: customer?.complement,
        customer_city: customer?.city,
        customer_state: customer?.state,
      },
      auto_return: "approved",
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      ...(baseUrl.startsWith("https://")
        ? { notification_url: `${baseUrl}/api/webhooks/mercadopago` }
        : {}),
    };

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceBody),
    });

    if (!mpResponse.ok) {
      const errorData = await mpResponse.text();
      console.error("MercadoPago API error:", errorData);
      return NextResponse.json(
        { error: "Erro ao processar checkout" },
        { status: 500 }
      );
    }

    const data = await mpResponse.json();

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout" },
      { status: 500 }
    );
  }
}
