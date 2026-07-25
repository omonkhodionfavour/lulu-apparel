import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Lulu Apparel" },
      {
        name: "description",
        content: "Review the watches in your Lulu Apparel shopping bag before checkout.",
      },
      { property: "og:title", content: "Your Bag | Lulu Apparel" },
      { property: "og:description", content: "Review your selected Lulu Apparel timepieces." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cartProducts, cartTotal, setQty, removeFromCart } = useStore();

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-3 font-display text-5xl">Your Bag</h1>

      {cartProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Button asChild className="mt-6 rounded-none px-8">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {cartProducts.map(({ product, qty }) => (
              <li key={product.id} className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-5 py-6">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-24 w-20 object-cover"
                />
                <div className="min-w-0">
                  <p className="eyebrow">{product.category}</p>
                  <Link to="/product/$productId" params={{ productId: product.id }}>
                    <h2 className="truncate font-display text-xl">{product.name}</h2>
                  </Link>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-border">
                      <button
                        aria-label="Decrease quantity"
                        className="px-2.5 py-1.5"
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button
                        aria-label="Increase quantity"
                        className="px-2.5 py-1.5"
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatPrice(product.price * qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-card p-8">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{cartTotal >= 500 ? "Complimentary" : formatPrice(35)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(cartTotal + (cartTotal >= 500 ? 0 : 35))}</dd>
              </div>
            </dl>
            <Button asChild className="mt-8 w-full rounded-none">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
