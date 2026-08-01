import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";

export const CATEGORIES = [
  "Luxury Watches",
  "Men's Watches",
  "Women's Watches",
  "Smart Watches",
  "Dress Watches",
  "Chronograph Watches",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  image: string;
image2?: string;
image3?: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  specs: { label: string; value: string }[];
}

const specs = (movement: string, caseSize: string, strap: string) => [
  { label: "Movement", value: movement },
  { label: "Case", value: caseSize },
  { label: "Strap", value: strap },
  { label: "Water Resistance", value: "10 ATM / 100m" },
  { label: "Crystal", value: "Anti-reflective sapphire" },
  { label: "Warranty", value: "5 years international" },
];

export const PRODUCTS: Product[] = [
  {
    id: "aurum-royale",
    name: "Aurum Royale Automatic",
    category: "Luxury Watches",
    price: 2450,
    compareAt: 2950,
    image: watch1,
    description:
      "A hand-finished 18k gold-plated case paired with a lacquered ivory dial. Assembled by a single watchmaker over 32 hours.",
    rating: 4.9,
    reviews: 214,
    stock: 6,
    bestSeller: true,
    specs: specs("Swiss automatic, 42h reserve", "40mm gold-plated steel", "Italian calf leather"),
  },
  {
    id: "noir-chronograph",
    name: "Noir Chronograph 1968",
    category: "Chronograph Watches",
    price: 1890,
    image: watch2,
    description:
      "Blacked-out steel, tri-compax subdials and a tachymeter bezel built for precision timing with quiet confidence.",
    rating: 4.8,
    reviews: 176,
    stock: 12,
    bestSeller: true,
    specs: specs("Automatic chronograph", "42mm PVD steel", "Brushed steel bracelet"),
  },
  {
    id: "lumiere-rose",
    name: "Lumière Rose Petite",
    category: "Women's Watches",
    price: 1290,
    compareAt: 1490,
    image: watch3,
    description:
      "A slender rose-gold bracelet watch with a mother-of-pearl dial that shifts with the light.",
    rating: 5,
    reviews: 98,
    stock: 9,
    newArrival: true,
    specs: specs("Swiss quartz", "28mm rose gold steel", "Rose gold link bracelet"),
  },
  {
    id: "heritage-dress",
    name: "Heritage Dress Slim",
    category: "Dress Watches",
    price: 980,
    image: watch1,
    description:
      "6.8mm thin, designed to disappear under a cuff and reappear at exactly the right moment.",
    rating: 4.7,
    reviews: 143,
    stock: 15,
    specs: specs("Ultra-thin automatic", "38mm gold-plated steel", "Cognac calf leather"),
  },
  {
    id: "obsidian-gmt",
    name: "Obsidian GMT Voyager",
    category: "Men's Watches",
    price: 2190,
    compareAt: 2490,
    image: watch2,
    description:
      "Dual-time GMT complication for those who keep two cities on their wrist at once.",
    rating: 4.8,
    reviews: 120,
    stock: 4,
    newArrival: true,
    specs: specs("Automatic GMT, 70h reserve", "41mm black steel", "Integrated steel bracelet"),
  },
  {
    id: "lulu-connect",
    name: "Lulu Connect Onyx",
    category: "Smart Watches",
    price: 640,
    image: watch2,
    description:
      "A sapphire AMOLED smart watch with a machined steel case — technology dressed for dinner.",
    rating: 4.6,
    reviews: 302,
    stock: 24,
    bestSeller: true,
    specs: specs("Digital, 14-day battery", "44mm steel", "Fluoroelastomer / quick release"),
  },
  {
    id: "eclat-diamond",
    name: "Éclat Diamond Bezel",
    category: "Women's Watches",
    price: 3150,
    image: watch3,
    description:
      "Thirty-two brilliant-cut stones set by hand around a polished rose-gold bezel.",
    rating: 4.9,
    reviews: 64,
    stock: 3,
    specs: specs("Swiss quartz", "30mm rose gold steel", "Rose gold link bracelet"),
  },
  {
    id: "monarch-power",
    name: "Monarch Power Reserve",
    category: "Luxury Watches",
    price: 4280,
    image: watch1,
    description:
      "An open-worked power reserve indicator and gold applied indices on a grand-feu dial.",
    rating: 5,
    reviews: 41,
    stock: 2,
    specs: specs("In-house automatic, 90h reserve", "41mm solid gold-plated", "Alligator-grain leather"),
  },
  {
    id: "velocity-racing",
    name: "Velocity Racing Chrono",
    category: "Chronograph Watches",
    price: 1550,
    compareAt: 1790,
    image: watch2,
    description:
      "Motorsport heritage: pump pushers, panda subdials and a flyback second hand.",
    rating: 4.7,
    reviews: 188,
    stock: 0,
    specs: specs("Automatic flyback chronograph", "43mm steel", "Perforated racing leather"),
  },
  {
    id: "atelier-gold",
    name: "Atelier Gold Classic",
    category: "Men's Watches",
    price: 1680,
    image: watch1,
    description:
      "The everyday gold watch — restrained proportions, warm tone, endlessly wearable.",
    rating: 4.8,
    reviews: 132,
    stock: 11,
    specs: specs("Automatic, 42h reserve", "39mm gold-plated steel", "Brown calf leather"),
  },
  {
    id: "soiree-slim",
    name: "Soirée Slim Evening",
    category: "Dress Watches",
    price: 1120,
    image: watch3,
    description:
      "Made for black tie. A jewel-like case with a bracelet that sits like a bangle.",
    rating: 4.9,
    reviews: 77,
    stock: 8,
    newArrival: true,
    specs: specs("Swiss quartz", "26mm rose gold steel", "Polished bangle bracelet"),
  },
  {
    id: "connect-titan",
    name: "Lulu Connect Titan",
    category: "Smart Watches",
    price: 890,
    compareAt: 999,
    image: watch2,
    description:
      "Grade 5 titanium, dual-band GPS and a display that stays readable in full sun.",
    rating: 4.7,
    reviews: 256,
    stock: 18,
    specs: specs("Digital, 21-day battery", "46mm titanium", "Titanium link bracelet"),
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);