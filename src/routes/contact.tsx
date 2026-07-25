import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Lulu Apparel | Client Care" },
      {
        name: "description",
        content:
          "Reach the Lulu Apparel client care team by email, phone or WhatsApp for orders, sizing, servicing and warranty questions.",
      },
      { property: "og:title", content: "Contact Lulu Apparel" },
      { property: "og:description", content: "Speak to a Lulu Apparel watch advisor." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Please tell us a little more").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="eyebrow">Client Care</p>
        <h1 className="mt-3 font-display text-5xl">Talk to an advisor.</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Sizing, servicing, warranty or a piece you can't find — our advisors reply within one
          business hour, Monday to Saturday.
        </p>
        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-center gap-3">
            <Mail className="size-4 shrink-0 text-gold" /> care@luluapparel.com
          </li>
          <li className="flex items-center gap-3">
            <Phone className="size-4 shrink-0 text-gold" /> +234 800 000 0000
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="size-4 shrink-0 text-gold" /> 14 Kingsway Road, Ikoyi, Lagos
          </li>
        </ul>
      </div>

      <form
        className="space-y-5 border border-border bg-card p-8"
        onSubmit={(e) => {
          e.preventDefault();
          const result = schema.safeParse(form);
          if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
          }
          setForm({ name: "", email: "", message: "" });
          toast.success("Message sent — we'll reply shortly.");
        }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 rounded-none"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 rounded-none"
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            maxLength={1000}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-2 rounded-none"
          />
        </div>
        <Button type="submit" className="w-full rounded-none">
          Send Message
        </Button>
      </form>
    </div>
  );
}
