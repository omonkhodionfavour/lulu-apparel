import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="noir-panel mt-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl uppercase tracking-[0.2em]">Lulu</p>
          <p className="text-[0.55rem] tracking-[0.45em] uppercase text-gold">Apparel</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-70">
            Timepieces assembled by hand, delivered in signature lacquered boxes, and guaranteed for
            five years worldwide.
          </p>
          <div className="mt-6 flex gap-4 opacity-70">
            <Instagram className="size-[18px]" />
            <Facebook className="size-[18px]" />
            <Twitter className="size-[18px]" />
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { to: "/shop", label: "All Watches" },
            { to: "/wishlist", label: "Wishlist" },
            { to: "/cart", label: "Cart" },
            { to: "/checkout", label: "Checkout" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            { to: "/faq", label: "FAQ" },
            { to: "/account", label: "Order Tracking" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { to: "/shipping-returns", label: "Shipping & Returns" },
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
          ]}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs opacity-60 sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Lulu Apparel. All rights reserved.</p>
          <p>Paystack · Flutterwave · Stripe</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[0.6875rem] uppercase tracking-[0.32em] text-gold">{title}</p>
      <ul className="mt-5 space-y-3 text-sm opacity-75">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="transition-opacity hover:opacity-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
