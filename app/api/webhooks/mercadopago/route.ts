import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildCustomerEmail, buildSellerEmail } from "../../../lib/emails";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();

    if (body.type !== "payment") {
      return NextResponse.json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

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

    const emailPromises = [];

    if (customer.email) {
      emailPromises.push(
        resend.emails.send({
          from: fromAddress,
          to: customer.email,
          subject: `Compra Aprovada — Pedido #${paymentId}`,
          html: buildCustomerEmail(emailData),
        })
      );
    }

    if (sellerEmail) {
      emailPromises.push(
        resend.emails.send({
          from: fromAddress,
          to: sellerEmail,
          subject: `Nova Venda #${paymentId} — ${customer.name}`,
          html: buildSellerEmail(emailData),
        })
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
