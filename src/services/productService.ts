import { supabase } from "@/lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);

  if (error) {
    console.error(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((product) => ({
  ...product,
  image: product.image_url,
  image2: product.image_2_url,
  image3: product.image_3_url,

  compareAt: product.compare_at,
  newArrival: product.new_arrival,
  bestSeller: product.best_seller,
}));
}