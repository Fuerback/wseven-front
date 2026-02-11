import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

interface CartItemRequest {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CartItemRequest[] };

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

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: "BRL",
        })),
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        //auto_return: "approved",
      },
    });

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout" },
      { status: 500 }
    );
  }
}
