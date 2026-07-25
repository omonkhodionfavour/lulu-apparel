import { Link } from "@tanstack/react-router";
import { Eye, Heart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quickView, setQuickView] = useState(false);
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <img
            src={product.image}
            alt={`${product.name} — ${product.category}`}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-gold px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground dark:text-background">
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="bg-primary px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-muted px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Sold out
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            aria-label="Add to wishlist"
            onClick={() => {
              toggleWishlist(product.id);
              toast.success(isWishlisted(product.id) ? "Removed from wishlist" : "Saved to wishlist");
            }}
            className="grid size-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors hover:text-gold"
          >
            <Heart
              className="size-4"
              fill={isWishlisted(product.id) ? "currentColor" : "none"}
            />
          </button>
          <button
            aria-label="Quick view"
            onClick={() => setQuickView(true)}
            className="grid size-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors hover:text-gold"
          >
            <Eye className="size-4" />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className="w-full rounded-none"
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product.id);
              toast.success(`${product.name} added to bag`);
            }}
          >
            {product.stock === 0 ? "Sold out" : "Add to Cart"}
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <p className="eyebrow">{product.category}</p>
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <h3 className="mt-1.5 font-display text-xl leading-snug">{product.name}</h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-gold text-gold" />
          {product.rating} · {product.reviews} reviews
        </div>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-base">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </p>
      </div>

      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-none p-0 sm:grid sm:grid-cols-2">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1100}
            className="hidden h-full w-full object-cover sm:block"
          />
          <div className="p-8">
            <p className="eyebrow">{product.category}</p>
            <h3 className="mt-2 font-display text-3xl">{product.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-5 text-xl">{formatPrice(product.price)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {product.stock > 0 ? `In stock — ${product.stock} available` : "Currently sold out"}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                className="rounded-none"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product.id);
                  setQuickView(false);
                  toast.success(`${product.name} added to bag`);
                }}
              >
                Add to Cart
              </Button>
              <Button asChild variant="outline" className="rounded-none">
                <Link to="/product/$productId" params={{ productId: product.id }}>
                  View full details
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
