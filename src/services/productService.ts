import { supabase } from "@/lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((product) => ({
    ...product,
    image: product.image_url,
    image2: product.image_2_url,
    image3: product.image_3_url,
    compareAt: product.compare_at,
    newArrival: product.new_arrival,
    bestSeller: product.best_seller,
  }));
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    ...data,
    image: data.image_url,
    image2: data.image_2_url,
    image3: data.image_3_url,
    compareAt: data.compare_at,
    newArrival: data.new_arrival,
    bestSeller: data.best_seller,
  };
}