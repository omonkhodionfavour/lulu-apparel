export function orderOnWhatsApp(product: {
  name: string;
  price: number;
}) {
  const phone = "2349068096647";

  const message = `Hello Lulu Timepiece,

I'm interested in this watch.

━━━━━━━━━━━━━━

Product:
${product.name}

Price:
₦${product.price.toLocaleString()}

━━━━━━━━━━━━━━

Could I see more photos and a video before ordering?

Thank you.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}