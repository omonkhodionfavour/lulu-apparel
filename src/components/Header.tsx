import { Link } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, theme, toggleTheme } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <button
            className="shrink-0 lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="min-w-0">
            <span className="block truncate font-display text-xl tracking-[0.2em] uppercase">
              Lulu
            </span>
            <span className="block text-[0.55rem] tracking-[0.45em] uppercase text-gold">
              Apparel
            </span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <Link to="/shop" aria-label="Search" className="hover:text-gold">
            <Search className="size-[18px]" />
          </Link>
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="hover:text-gold">
            {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-gold">
            <Heart className="size-[18px]" />
            {wishlist.length > 0 && <Dot value={wishlist.length} />}
          </Link>
          <Link to="/account" aria-label="Account" className="hidden hover:text-gold sm:block">
            <User className="size-[18px]" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-gold">
            <ShoppingBag className="size-[18px]" />
            {cartCount > 0 && <Dot value={cartCount} />}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm uppercase tracking-[0.2em] text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="block py-2.5 text-sm uppercase tracking-[0.2em] text-muted-foreground"
          >
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}

function Dot({ value }: { value: number }) {
  return (
    <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-medium text-primary-foreground dark:text-background">
      {value}
    </span>
  );
}
