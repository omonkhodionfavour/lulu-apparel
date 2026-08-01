import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { getProduct, getProducts } from "@/services/productService";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$productId")({
 loader: async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    throw notFound();
  }

  return { product };
},
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Watch not found | Lulu Apparel" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | Lulu Apparel` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | Lulu Apparel` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);

const images = [
  product.image,
  product.image2,
  product.image3,
].filter(Boolean);
console.log(product);
console.log(images);
const [selectedImage, setSelectedImage] = useState(images[0]); 
 const [related, setRelated] = useState<any[]>([]);
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
useEffect(() => {
  async function loadRelated() {
    const products = await getProducts();

    setRelated(
      products
        .filter(
          (p: any) =>
            p.category === product.category &&
            p.id !== product.id
        )
        .slice(0, 3)
    );
  }

  loadRelated();
}, [product]);
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-gold">
          Home
        </Link>
        {" / "}
        <Link to="/shop" className="hover:text-gold">
          Shop
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
       <div>
  <div className="bg-secondary">
    <img
      src={selectedImage}
      alt={product.name}
      width={900}
      height={1100}
      className="w-full object-cover"
    />
  </div>

  {images.length > 1 && (
    <div className="mt-4 flex gap-3">
      {images.map((img) => (
        <button
          key={img}
          onClick={() => setSelectedImage(img)}
          className={`overflow-hidden border-2 ${
            selectedImage === img
              ? "border-gold"
              : "border-transparent"
          }`}
        >
          <img
            src={img}
            alt={product.name}
            className="h-24 w-24 object-cover"
          />
        </button>
      ))}
    </div>
  )}
</div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`}
                />
              ))}
            </span>
            {product.rating} · {product.reviews} reviews
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="bg-gold px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground dark:text-background">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <p className="mt-5 text-xs uppercase tracking-[0.2em]">
            {product.stock > 0 ? (
              <span className="text-gold">In stock — {product.stock} remaining</span>
            ) : (
              <span className="text-muted-foreground">Sold out</span>
            )}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                aria-label="Decrease quantity"
                className="px-3 py-2.5"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="px-3 py-2.5"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className="flex items-center gap-2 border border-border px-4 py-2.5 text-xs uppercase tracking-[0.2em] hover:text-gold"
            >
              <Heart className="size-4" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              Wishlist
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button
              className="rounded-none"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.id, qty);
                toast.success(`${product.name} added to bag`);
              }}
            >
              Add to Cart
            </Button>
            <Button asChild variant="outline" className="rounded-none" disabled={product.stock === 0}>
              <Link to="/checkout" onClick={() => addToCart(product.id, qty)}>
                Buy Now
              </Link>
            </Button>
          </div>

          <dl className="mt-10 border-t border-border">
            {product.specs.map((spec: { label: string; value: string }) => (
              <div key={spec.label} className="grid grid-cols-2 gap-4 border-b border-border py-3 text-sm">
                <dt className="text-muted-foreground">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow">You may also like</p>
          <h2 className="mt-3 mb-10 font-display text-3xl">More {product.category}</h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
