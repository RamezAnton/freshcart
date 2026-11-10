import { Category } from "@/interfaces/category.interface";
import { ListingResponse } from "@/interfaces/listing.interface";
import { Product } from "@/interfaces/product.interface";

export type CategoryResponse = ListingResponse<Category>;
export type ProductsResponse = ListingResponse<Product>;
