import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348000000000?text=Hello%20Lulu%20Apparel%2C%20I%20have%20a%20question%20about%20your%20watches"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid size-13 place-items-center rounded-full bg-primary p-3.5 text-primary-foreground luxe-shadow transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
    </a>
  );
}
