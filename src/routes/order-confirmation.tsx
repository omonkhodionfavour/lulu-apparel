import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmation")({
  component: OrderConfirmation,
});

function OrderConfirmation() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center px-4">
      <div className="text-5xl mb-4">✓</div>
      <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
      <p className="text-muted-foreground mb-2">Your order has been received.</p>
      <p className="text-muted-foreground mb-6">
        We've opened WhatsApp so you can complete your order and see more photos before confirming.
      </p>
      <Link to="/shop" className="underline">Continue Shopping</Link>
    </div>
  );
}