export async function getCategories() {
  "use cache";

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
  if (!response.ok) {
    throw new Error(
      `${response.status} Error Occurred while fetching Categories`,
    );
  }
  return await response.json();
}
