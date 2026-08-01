import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CATEGORIES } from "@/data/products";
import { getProducts } from "@/services/productService";

type ShopSearch = {
  category?: string;
  q?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category:
      typeof search.category === "string"
        ? search.category
        : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),

  head: () => ({
    meta: [
      { title: "Shop Luxury Watches | Lulu Apparel" },
      {
        name: "description",
        content:
          "Browse the full Lulu Apparel collection of luxury watches.",
      },
    ],
  }),

  component: Shop,
});

function Shop() {
  const { category: initialCategory } = Route.useSearch();

  const [category, setCategory] = useState(initialCategory ?? "all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
     const data = await getProducts();
console.log("DATA FROM SERVICE:", data);
      console.log("PRODUCTS:", data);
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (
          (p.name ?? "") +
          (p.category ?? "") +
          (p.description ?? "")
        )
          .toLowerCase()
          .includes(query.trim().toLowerCase())
    );

    if (sort === "price-asc") {
      list = [...list].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "price-desc") {
      list = [...list].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sort === "rating") {
      list = [...list].sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return list;
  }, [products, category, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="eyebrow">The Collection</p>

      <h1 className="mt-3 font-display text-5xl">
        Shop All Watches
      </h1>

      <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search watches..."
            className="rounded-none pl-9"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full rounded-none md:w-56">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All categories
            </SelectItem>

            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full rounded-none md:w-48">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="featured">
              Featured
            </SelectItem>

            <SelectItem value="price-asc">
              Price: low to high
            </SelectItem>

            <SelectItem value="price-desc">
              Price: high to low
            </SelectItem>

            <SelectItem value="rating">
              Top rated
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        {filteredProducts.length} pieces
      </p>

      <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-24 text-center text-sm text-muted-foreground">
          No watches match that search yet.
        </p>
      )}
    </div>
  );
}