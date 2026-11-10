import { notFound } from "next/navigation";

export async function getProducts() {
  "use cache";

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  if (!response.ok) {
    throw new Error(
      `${response.status} Error Occurred while fetching Products`,
    );
  }
  return await response.json();
}

export async function getSingleProduct(productId: string) {
  "use cache";

  if (!/^[a-f\d]{24}$/i.test(productId)) notFound();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
  );
  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(
      `${response.status} Error Occurred while fetching Single Product`,
    );
  }
  return await response.json();
}
