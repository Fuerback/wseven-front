export const runtime = 'edge';

import { NextResponse } from "next/server";
import { buildCustomerEmail, buildSellerEmail } from "../../../lib/emails";

async function sendEmail(apiKey: string, from: string, to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API error: ${err}`);
  }
  return res.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type !== "payment") {
      return NextResponse.json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    });

    if (!mpResponse.ok) {
      console.error("MercadoPago API error:", await mpResponse.text());
      return NextResponse.json({ received: true, error: "mp_api_error" }, { status: 200 });
    }

    const payment = await mpResponse.json();

    if (payment.status !== "approved") {
      return NextResponse.json({ received: true, status: payment.status });
    }

    const metadata = payment.metadata || {};
    const customer = {
      name: metadata.customer_name || "",
      email: metadata.customer_email || "",
      cep: metadata.customer_cep || "",
      street: metadata.customer_street || "",
      number: metadata.customer_number || "",
      complement: metadata.customer_complement || "",
      city: metadata.customer_city || "",
      state: metadata.customer_state || "",
    };

    const items = (payment.additional_info?.items || []).map(
      (item: { title?: string; quantity?: string | number; unit_price?: string | number }) => ({
        title: item.title || "Produto",
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.unit_price) || 0,
      })
    );

    const emailData = {
      paymentId: String(paymentId),
      totalAmount: payment.transaction_amount || 0,
      items,
      customer,
    };

    const fromAddress = process.env.EMAIL_FROM || "W Seven <onboarding@resend.dev>";
    const sellerEmail = process.env.NOTIFICATION_EMAIL!;
    const apiKey = process.env.RESEND_API_KEY!;

    const emailPromises = [];

    if (customer.email) {
      emailPromises.push(
        sendEmail(apiKey, fromAddress, customer.email, `Compra Aprovada — Pedido #${paymentId}`, buildCustomerEmail(emailData))
      );
    }

    if (sellerEmail) {
      emailPromises.push(
        sendEmail(apiKey, fromAddress, sellerEmail, `Nova Venda #${paymentId} — ${customer.name}`, buildSellerEmail(emailData))
      );
    }

    const results = await Promise.allSettled(emailPromises);
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Erro ao enviar email ${i}:`, result.reason);
      }
    });

    return NextResponse.json({ received: true, emails_sent: results.length });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ received: true, error: "internal" }, { status: 200 });
  }
}
