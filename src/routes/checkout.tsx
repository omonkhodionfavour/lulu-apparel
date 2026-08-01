import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import { sendOrderToWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Lulu Apparel" },
      { property: "og:title", content: "Checkout | Lulu Apparel" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  address: z.string().trim().min(5, "Enter your delivery address").max(200),
  city: z.string().trim().min(1, "City is required").max(80),
  state: z.string().trim().min(1, "State is required").max(80),
  country: z.string().trim().min(1, "Country is required").max(80),
});

const EMPTY = { name: "", phone: "", address: "", city: "", state: "", country: "" };

function Checkout() {
  const { cartProducts, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState(EMPTY);
  const navigate = useNavigate();
  const shipping = cartTotal >= 500 ? 0 : 35;

  const field = (key: keyof typeof EMPTY, label: string, type = "text") => (
    <div>
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        maxLength={255}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-2 rounded-none"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <p className="eyebrow">Step 2 of 2</p>
      <h1 className="mt-3 font-display text-5xl">Checkout</h1>

      {cartProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">There is nothing to check out yet.</p>
          <Button asChild className="mt-6 rounded-none px-8">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      ) : (
        <form
          className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]"
          onSubmit={(e) => {
            e.preventDefault();
            const result = schema.safeParse(form);
            if (!result.success) {
              toast.error(result.error.issues[0].message);
              return;
            }

            const fullAddress = `${form.address}, ${form.city}, ${form.state}, ${form.country}`;

            sendOrderToWhatsApp(
              { name: form.name, phone: form.phone, address: fullAddress },
              cartProducts,
              cartTotal + shipping
            );

            clearCart();
            toast.success("Opening WhatsApp to confirm your order...");
            navigate({ to: "/order-confirmation" });
          }}
        >
          <div className="space-y-8">
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {field("name", "Full name")}
                {field("phone", "Phone", "tel")}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl">Delivery</h2>
              {field("address", "Delivery address")}
              <div className="grid gap-5 sm:grid-cols-3">
                {field("city", "City")}
                {field("state", "State")}
                {field("country", "Country")}
              </div>
            </section>
          </div>

          <aside className="h-fit border border-border bg-card p-8">
            <h2 className="font-display text-2xl">Order</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {cartProducts.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between gap-4">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {product.name} × {qty}
                  </span>
                  <span className="shrink-0">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between text-base">
                <dt>Total</dt>
                <dd>{formatPrice(cartTotal + shipping)}</dd>
              </div>
            </dl>
            <Button type="submit" className="mt-8 w-full rounded-none">
              Complete Order via WhatsApp
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              We'll confirm photos, video and final details with you on WhatsApp
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}