import { createFileRoute } from "@tanstack/react-router";
import { Clause, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Lulu Apparel" },
      {
        name: "description",
        content:
          "How Lulu Apparel collects, uses, stores and protects your personal information when you shop with us.",
      },
      { property: "og:title", content: "Privacy Policy | Lulu Apparel" },
      { property: "og:description", content: "Our commitments on data collection, use and retention." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This page is maintained by Lulu Apparel to explain how we handle customer information."
    >
      <Clause title="What we collect">
        <p>
          Name, email, phone number and delivery address when you place an order; your cart and
          wishlist, stored locally in your browser; and basic analytics about pages visited.
        </p>
      </Clause>
      <Clause title="How we use it">
        <p>
          To process and deliver orders, provide warranty and servicing support, and — only with your
          consent — to send collection announcements. We do not sell customer data.
        </p>
      </Clause>
      <Clause title="Payments">
        <p>
          Card details are entered directly with our payment processors (Paystack, Flutterwave or
          Stripe) and are never stored on our servers.
        </p>
      </Clause>
      <Clause title="Retention and your rights">
        <p>
          Order records are kept for the duration of the warranty period. You may request a copy or
          deletion of your data at any time by writing to care@luluapparel.com.
        </p>
      </Clause>
      <Clause title="Cookies">
        <p>
          We use essential cookies and local storage to remember your bag, wishlist and theme
          preference, plus privacy-respecting analytics to understand which pages are useful.
        </p>
      </Clause>
    </PageShell>
  ),
});
