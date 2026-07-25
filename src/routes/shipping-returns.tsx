import { createFileRoute } from "@tanstack/react-router";
import { Clause, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns | Lulu Apparel" },
      {
        name: "description",
        content:
          "Insured worldwide shipping, delivery timelines, duties and the Lulu Apparel 30-day return and exchange policy.",
      },
      { property: "og:title", content: "Shipping & Returns | Lulu Apparel" },
      { property: "og:description", content: "How Lulu Apparel ships, and how returns work." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Policies"
      title="Shipping & Returns"
      intro="Every order ships insured, signature-required, in a lacquered presentation box."
    >
      <Clause title="Delivery times">
        <p>Lagos & Abuja: 1–2 business days. Rest of Nigeria: 2–4 business days.</p>
        <p>West Africa: 3–6 business days. International: 5–9 business days.</p>
      </Clause>
      <Clause title="Shipping cost">
        <p>
          Complimentary on all orders above $500. Below that, a flat insured rate is calculated at
          checkout based on destination.
        </p>
      </Clause>
      <Clause title="Duties and taxes">
        <p>
          International orders may attract import duty on arrival, payable by the recipient. We
          declare full value on all shipments as insurance requires.
        </p>
      </Clause>
      <Clause title="Returns">
        <p>
          Thirty days from delivery. The watch must be unworn, with protective film intact, in its
          original box with the warranty card. Refunds are issued to the original payment method
          within five business days of inspection.
        </p>
      </Clause>
      <Clause title="Exchanges and faults">
        <p>
          Exchanges are free within 30 days. If a watch arrives faulty, we cover collection and
          replacement outright — write to care@luluapparel.com with your order number.
        </p>
      </Clause>
    </PageShell>
  ),
});
