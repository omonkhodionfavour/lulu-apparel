import { createFileRoute } from "@tanstack/react-router";
import { Clause, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lulu Apparel | Our Watchmaking Story" },
      {
        name: "description",
        content:
          "Lulu Apparel builds hand-assembled luxury watches with Swiss and Japanese movements, sapphire crystal and a five-year international warranty.",
      },
      { property: "og:title", content: "About Lulu Apparel" },
      {
        property: "og:description",
        content: "How Lulu Apparel builds boutique-grade watches without the boutique markup.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="Our Story"
      title="A house built on patience."
      intro="Lulu Apparel began with a simple frustration: the watches we admired cost more than they were worth, and the watches we could afford felt like nothing at all. So we built the third option."
    >
      <Clause title="The atelier">
        <p>
          Every Lulu Apparel timepiece is assembled by a single watchmaker from case-back to crown.
          No conveyor, no split assembly. A complicated chronograph takes over thirty hours before it
          is cased and regulated in five positions.
        </p>
      </Clause>
      <Clause title="Materials, without compromise">
        <p>
          316L surgical-grade steel, anti-reflective sapphire crystal, genuine Italian calf leather
          and gold applied by a PVD process rated for a decade of daily wear. Nothing decorative is
          ever structural, and nothing structural is ever hidden.
        </p>
      </Clause>
      <Clause title="Direct, deliberately">
        <p>
          We sell only through this boutique. Removing the distribution layer is why a watch that
          would retail at four figures elsewhere sits where it does here — and why we can offer a
          five-year international warranty on every reference.
        </p>
      </Clause>
      <Clause title="The promise">
        <p>
          Thirty days to change your mind. Five years of warranty. Complimentary servicing at year
          three. A named advisor on WhatsApp for as long as you own the watch.
        </p>
      </Clause>
    </PageShell>
  );
}
