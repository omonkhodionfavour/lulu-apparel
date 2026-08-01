import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProducts } from "@/services/productService";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  image2?: string;
  image3?: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  specs: { label: string; value: string }[];
}

export interface CartLine {
  id: string;
  qty: number;
}

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  theme: "light" | "dark";
  cartCount: number;
  cartTotal: number;
  cartProducts: { product: Product; qty: number }[];
  wishlistProducts: Product[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCart(read<CartLine[]>("lulu.cart", []));
    setWishlist(read<string[]>("lulu.wishlist", []));
    setTheme(read<"light" | "dark">("lulu.theme", "light"));
    getProducts().then((data) => setProducts(data as Product[]));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lulu.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    window.localStorage.setItem("lulu.wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    window.localStorage.setItem("lulu.theme", JSON.stringify(theme));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const value = useMemo<StoreValue>(() => {
    const cartProducts = cart
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { product, qty: line.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    return {
      cart,
      wishlist,
      theme,
      cartProducts,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: cartProducts.reduce((sum, l) => sum + l.product.price * l.qty, 0),
      wishlistProducts: products.filter((p) => wishlist.includes(p.id)),
      addToCart: (id, qty = 1) =>
        setCart((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, qty }],
        ),
      setQty: (id, qty) =>
        setCart((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      removeFromCart: (id) => setCart((prev) => prev.filter((l) => l.id !== id)),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])),
      isWishlisted: (id) => wishlist.includes(id),
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    };
  }, [cart, wishlist, theme, products]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}