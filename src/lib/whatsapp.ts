import type { Product } from "@/lib/store";
import { formatPrice } from "@/data/products";

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

interface OrderItem {
  product: Product;
  qty: number;
}

const STORE_PHONE = "2349068096647";

export function sendOrderToWhatsApp(customer: CustomerInfo, items: OrderItem[], total: number) {
  const itemLines = items
    .map(
      (line, i) =>
        `${i + 1}. ${line.product.name}\n   Qty: ${line.qty} × ${formatPrice(line.product.price)} = ${formatPrice(line.product.price * line.qty)}`
    )
    .join("\n\n");

  const message = `Hello Lulu Apparel,

I'd like to place an order.

━━━━━━━━━━━━━━
ORDER SUMMARY
━━━━━━━━━━━━━━

${itemLines}

━━━━━━━━━━━━━━
Total: ${formatPrice(total)}
━━━━━━━━━━━━━━

DELIVERY DETAILS
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}${customer.notes ? `\nNotes: ${customer.notes}` : ""}

Could I see more photos and a short video before I confirm payment?

Thank you.`;

  const url = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Keep your existing single-product quick-order (product page "Buy Now") working
export function orderOnWhatsApp(product: { name: string; price: number }) {
  const message = `Hello Lulu Apparel,

I'm interested in this watch.

━━━━━━━━━━━━━━

Product:
${product.name}

Price:
${formatPrice(product.price)}

━━━━━━━━━━━━━━

Could I see more photos and a video before ordering?

Thank you.`;

  const url = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}