import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ChevronRight, Shield, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroWatch from "@/assets/hero-watch.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faqs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lulu Apparel | Luxury Watches Crafted for Every Moment" },
      {
        name: "description",
        content:
          "Discover Lulu Apparel luxury watches — automatic, chronograph, dress and smart watches for men and women, with five-year international warranty.",
      },
      { property: "og:title", content: "Lulu Apparel | Luxury Watches" },
      {
        property: "og:description",
        content: "Timeless Luxury. Crafted for Every Moment. Shop the Lulu Apparel collection.",
      },
    ],
  }),
  component: Home,
});

const REVIEWS = [
  {
    name: "Adeola M.",
    text: "The Aurum Royale arrived in a lacquered box that felt like a gift to myself. The finishing is genuinely exceptional.",
  },
  {
    name: "James O.",
    text: "I've owned Swiss watches at three times this price. The Noir Chronograph holds its own on the wrist and in the room.",
  },
  {
    name: "Chinwe A.",
    text: "Ordered on Tuesday, wearing it Thursday. The Lumière Rose is now the only watch I reach for.",
  },
];

function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="noir-panel relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="fade-up">
            <p className="text-[0.6875rem] uppercase tracking-[0.32em] text-gold">
              The 2026 Collection
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Timeless Luxury.
              <br />
              Crafted for Every Moment.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">
              Hand-assembled movements, sapphire crystal and gold finishing — Lulu Apparel builds
              watches meant to be worn for decades, then handed down.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none bg-gold px-9 text-background hover:bg-gold/90">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-white/25 bg-transparent px-9 text-inherit hover:bg-white/10"
              >
                <Link to="/about">Our Craft</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroWatch}
            alt="Gold chronograph watch by Lulu Apparel on a dark background"
            width={1600}
            height={1200}
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-3 lg:px-8">
          {[
            { icon: Truck, title: "Complimentary shipping", text: "Insured worldwide delivery" },
            { icon: Shield, title: "5-year warranty", text: "International coverage" },
            { icon: Award, title: "Hand-assembled", text: "One watchmaker per watch" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <item.icon className="size-5 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="truncate text-sm">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section title="Featured Collections" eyebrow="Browse by category">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const sample = PRODUCTS.find((p) => p.category === category)!;
            return (
              <Link
                key={category}
                to="/shop"
                search={{ category }}
                className="group relative block overflow-hidden bg-secondary"
              >
                <img
                  src={sample.image}
                  alt={category}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur">
                  <span className="font-display text-lg">{category}</span>
                  <ChevronRight className="size-4 text-gold" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="Best Sellers" eyebrow="Most coveted">
        <ProductGrid ids={bestSellers.map((p) => p.id)} />
      </Section>

      <section className="noir-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.32em] text-gold">
              Why Lulu Apparel
            </p>
            <h2 className="mt-5 font-display text-4xl">
              A boutique standard, without the boutique markup.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["Materials", "316L steel, sapphire crystal and genuine Italian leather on every model."],
              ["Movements", "Swiss and Japanese automatic calibres, regulated in five positions."],
              ["Service", "A named advisor for every order, reachable on WhatsApp within minutes."],
              ["Assurance", "30-day returns and a five-year international warranty, no conditions."],
            ].map(([title, text]) => (
              <div key={title}>
                <div className="gold-rule" />
                <p className="mt-4 font-display text-xl">{title}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="New Arrivals" eyebrow="Just landed">
        <ProductGrid ids={newArrivals.map((p) => p.id)} />
      </Section>

      <Section title="What Our Clients Say" eyebrow="Reviews">
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="border border-border bg-card p-8">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em]">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Frequently Asked" eyebrow="Good to know">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {FAQS.slice(0, 5).map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-left font-display text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <p className="eyebrow">The List</p>
          <h2 className="mt-4 font-display text-4xl">Private releases, before anyone else.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Limited runs sell out in hours. Subscribers get 24 hours of early access.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                toast.error("Please enter a valid email address");
                return;
              }
              setEmail("");
              toast.success("You're on the list.");
            }}
          >
            <Input
              type="email"
              required
              maxLength={255}
              placeholder="your@email.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none bg-background"
            />
            <Button type="submit" className="rounded-none px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 mb-10 font-display text-4xl">{title}</h2>
      {children}
    </section>
  );
}

function ProductGrid({ ids }: { ids: string[] }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.filter((p) => ids.includes(p.id)).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
