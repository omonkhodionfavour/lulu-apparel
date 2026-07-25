import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account & Order Tracking | Lulu Apparel" },
      {
        name: "description",
        content: "Sign in to your Lulu Apparel account to track orders, manage details and view warranties.",
      },
      { property: "og:title", content: "Account | Lulu Apparel" },
      { property: "og:description", content: "Track your Lulu Apparel orders and manage your details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

const STEPS = [
  { icon: CheckCircle2, label: "Order confirmed", done: true },
  { icon: Package, label: "Assembled & inspected", done: true },
  { icon: Truck, label: "Out for delivery", done: false },
];

function Account() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <p className="eyebrow">Your Account</p>
      <h1 className="mt-3 font-display text-5xl">Welcome back</h1>

      <Tabs defaultValue="signin" className="mt-12">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="signin" className="flex-1 rounded-none">
            Sign in
          </TabsTrigger>
          <TabsTrigger value="track" className="flex-1 rounded-none">
            Track order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="border border-border bg-card p-8">
          <div className="space-y-5">
            <div>
              <Label htmlFor="acct-email">Email</Label>
              <Input id="acct-email" type="email" maxLength={255} className="mt-2 rounded-none" />
            </div>
            <div>
              <Label htmlFor="acct-password">Password</Label>
              <Input id="acct-password" type="password" maxLength={100} className="mt-2 rounded-none" />
            </div>
            <Button className="w-full rounded-none" disabled>
              Sign in
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Accounts activate once the store backend is connected.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="track" className="border border-border bg-card p-8">
          <Label htmlFor="order-id">Order number</Label>
          <Input id="order-id" placeholder="LA-000000" maxLength={20} className="mt-2 rounded-none" />
          <ol className="mt-8 space-y-5">
            {STEPS.map((step) => (
              <li key={step.label} className="flex items-center gap-4 text-sm">
                <step.icon className={`size-5 shrink-0 ${step.done ? "text-gold" : "text-muted-foreground"}`} />
                <span className={step.done ? "" : "text-muted-foreground"}>{step.label}</span>
              </li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>

      <p className="mt-10 text-sm text-muted-foreground">
        Need help with an order?{" "}
        <Link to="/contact" className="text-gold underline-offset-4 hover:underline">
          Contact client care
        </Link>
        .
      </p>
    </div>
  );
}
