import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | Lulu Apparel" },
      {
        name: "description",
        content: "The Lulu Apparel timepieces you've saved for later, kept on this device.",
      },
      { property: "og:title", content: "Your Wishlist | Lulu Apparel" },
      { property: "og:description", content: "Saved Lulu Apparel watches." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlistProducts } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p className="eyebrow">Saved</p>
      <h1 className="mt-3 font-display text-5xl">Your Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          <Button asChild className="mt-6 rounded-none px-8">
            <Link to="/shop">Find your watch</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
