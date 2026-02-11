export const runtime = 'edge';

import { MercadoPagoConfig, Preference } from "mercadopago";
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

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.trim() || "http://localhost:3000";

    const [firstName, ...lastParts] = (customer?.name || "").trim().split(" ");
    const lastName = lastParts.join(" ") || firstName;

    const response = await preference.create({
      body: {
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
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        ...(baseUrl.startsWith("https://")
          ? { notification_url: `${baseUrl}/api/webhooks/mercadopago` }
          : {}),
      },
    });

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout", details: String(error) },
      { status: 500 }
    );
  }
}
