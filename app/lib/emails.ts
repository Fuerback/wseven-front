interface PaymentItem {
  title: string;
  quantity: number;
  unit_price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

interface EmailData {
  paymentId: string;
  totalAmount: number;
  items: PaymentItem[];
  customer: CustomerInfo;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function itemsTableRows(items: PaymentItem[]): string {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5;">${item.title}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">${formatCurrency(item.unit_price)}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">${formatCurrency(item.unit_price * item.quantity)}</td>
      </tr>`
    )
    .join("");
}

export function buildCustomerEmail(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #1a3a2a; padding: 32px; text-align: center;">
      <h1 style="color: #d4a574; margin: 0; font-size: 24px;">W Seven Special Coffee</h1>
      <p style="color: #f5f0e8; margin: 8px 0 0; font-size: 14px;">High Quality · Special Coffee</p>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">
      <h2 style="color: #1a3a2a; margin: 0 0 8px;">Compra Aprovada! ✓</h2>
      <p style="color: #555; font-size: 14px; line-height: 1.6;">
        Olá <strong>${data.customer.name}</strong>,<br>
        Seu pagamento foi confirmado com sucesso. Confira os detalhes do seu pedido abaixo.
      </p>

      <p style="color: #888; font-size: 12px; margin: 16px 0 8px;">Pedido #${data.paymentId}</p>

      <!-- Items table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
        <thead>
          <tr style="background-color: #1a3a2a; color: #f5f0e8;">
            <th style="padding: 10px 12px; text-align: left;">Produto</th>
            <th style="padding: 10px 12px; text-align: center;">Qtd</th>
            <th style="padding: 10px 12px; text-align: right;">Preço</th>
            <th style="padding: 10px 12px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsTableRows(data.items)}
        </tbody>
      </table>

      <div style="text-align: right; padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
        <span style="font-size: 18px; font-weight: bold; color: #1a3a2a;">
          Total: ${formatCurrency(data.totalAmount)}
        </span>
      </div>

      <!-- Delivery address -->
      <h3 style="color: #1a3a2a; margin: 24px 0 8px; font-size: 15px;">Endereço de Entrega</h3>
      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; font-size: 13px; color: #555; line-height: 1.6;">
        ${data.customer.street}, ${data.customer.number}${data.customer.complement ? ` - ${data.customer.complement}` : ""}<br>
        ${data.customer.city} - ${data.customer.state}<br>
        CEP: ${data.customer.cep}
      </div>

      <p style="color: #555; font-size: 13px; line-height: 1.6; margin-top: 24px;">
        Agradecemos sua preferência! Em breve você receberá informações sobre o envio do seu pedido.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #1a3a2a; padding: 24px; text-align: center;">
      <p style="color: #f5f0e8; margin: 0; font-size: 12px;">
        W Seven Special Coffee · Minas Gerais, Brasil
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function buildSellerEmail(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #1a3a2a; padding: 24px; text-align: center;">
      <h1 style="color: #d4a574; margin: 0; font-size: 20px;">Nova Venda — W Seven</h1>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">
      <p style="color: #555; font-size: 14px; margin: 0 0 4px;">
        <strong>Pagamento #${data.paymentId}</strong> aprovado
      </p>
      <p style="color: #1a3a2a; font-size: 24px; font-weight: bold; margin: 8px 0 24px;">
        ${formatCurrency(data.totalAmount)}
      </p>

      <!-- Customer info -->
      <h3 style="color: #1a3a2a; margin: 0 0 8px; font-size: 14px;">Cliente</h3>
      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; font-size: 13px; color: #555; line-height: 1.8; margin-bottom: 20px;">
        <strong>Nome:</strong> ${data.customer.name}<br>
        <strong>Email:</strong> ${data.customer.email}<br>
        <strong>Endereço:</strong> ${data.customer.street}, ${data.customer.number}${data.customer.complement ? ` - ${data.customer.complement}` : ""}<br>
        <strong>Cidade:</strong> ${data.customer.city} - ${data.customer.state}<br>
        <strong>CEP:</strong> ${data.customer.cep}
      </div>

      <!-- Items table -->
      <h3 style="color: #1a3a2a; margin: 0 0 8px; font-size: 14px;">Itens do Pedido</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="background-color: #1a3a2a; color: #f5f0e8;">
            <th style="padding: 10px 12px; text-align: left;">Produto</th>
            <th style="padding: 10px 12px; text-align: center;">Qtd</th>
            <th style="padding: 10px 12px; text-align: right;">Preço</th>
            <th style="padding: 10px 12px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsTableRows(data.items)}
        </tbody>
      </table>

      <div style="text-align: right; padding: 12px; margin-top: 8px; background-color: #f9f9f9; border-radius: 8px;">
        <span style="font-size: 16px; font-weight: bold; color: #1a3a2a;">
          Total: ${formatCurrency(data.totalAmount)}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #1a3a2a; padding: 16px; text-align: center;">
      <p style="color: #f5f0e8; margin: 0; font-size: 11px;">Notificação automática — W Seven</p>
    </div>
  </div>
</body>
</html>`;
}
