import { createFileRoute } from "@tanstack/react-router";
import { Clause, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Lulu Apparel" },
      {
        name: "description",
        content:
          "The terms governing purchases, pricing, warranty coverage and use of the Lulu Apparel online boutique.",
      },
      { property: "og:title", content: "Terms & Conditions | Lulu Apparel" },
      { property: "og:description", content: "Terms of sale and use for the Lulu Apparel boutique." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Legal" title="Terms & Conditions">
      <Clause title="Orders">
        <p>
          An order is a request to purchase and is accepted once we confirm it by email. We may
          decline an order where stock, pricing or verification issues arise, and will refund in full.
        </p>
      </Clause>
      <Clause title="Pricing">
        <p>
          Prices are shown in US dollars and may change without notice. The price applied is the one
          displayed at the moment your order is confirmed.
        </p>
      </Clause>
      <Clause title="Warranty">
        <p>
          Five years international coverage on movement and finishing defects. Coverage excludes
          accidental damage, water ingress from an unscrewed crown, and unauthorised servicing.
        </p>
      </Clause>
      <Clause title="Intellectual property">
        <p>
          All imagery, copy and designs on this site belong to Lulu Apparel and may not be reproduced
          without written permission.
        </p>
      </Clause>
      <Clause title="Governing law">
        <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
      </Clause>
    </PageShell>
  ),
});
