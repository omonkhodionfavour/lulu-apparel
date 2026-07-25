import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Lulu Apparel" },
      {
        name: "description",
        content:
          "Complete your Lulu Apparel order with Paystack, Flutterwave or Stripe on an encrypted checkout.",
      },
      { property: "og:title", content: "Secure Checkout | Lulu Apparel" },
      { property: "og:description", content: "Pay securely with Paystack, Flutterwave or Stripe." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  address: z.string().trim().min(5, "Enter your delivery address").max(200),
  city: z.string().trim().min(1, "City is required").max(80),
  state: z.string().trim().min(1, "State is required").max(80),
  country: z.string().trim().min(1, "Country is required").max(80),
});

const EMPTY = { name: "", email: "", phone: "", address: "", city: "", state: "", country: "" };

function Checkout() {
  const { cartProducts, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [payment, setPayment] = useState("paystack");
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
            clearCart();
            toast.success(`Order placed — ${payment} confirmation sent to ${form.email}`);
            navigate({ to: "/account" });
          }}
        >
          <div className="space-y-8">
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {field("name", "Full name")}
                {field("email", "Email", "email")}
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

            <section>
              <h2 className="font-display text-2xl">Payment</h2>
              <RadioGroup value={payment} onValueChange={setPayment} className="mt-5 space-y-3">
                {[
                  ["paystack", "Paystack", "Cards, bank transfer and USSD"],
                  ["flutterwave", "Flutterwave", "Cards, mobile money and transfers"],
                  ["stripe", "Stripe", "International cards"],
                ].map(([value, label, hint]) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className="flex cursor-pointer items-center gap-4 border border-border p-4 has-[:checked]:border-gold"
                  >
                    <RadioGroupItem id={value} value={value} />
                    <span className="min-w-0">
                      <span className="block text-sm">{label}</span>
                      <span className="block text-xs text-muted-foreground">{hint}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
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
              Place Order
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Encrypted checkout · 30-day returns
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}
