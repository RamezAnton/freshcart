export interface ListingResponse<T> {
  result: number;
  metadata: Pagination;
  data: T[];
}

interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
