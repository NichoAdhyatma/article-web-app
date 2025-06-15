export type Category = {
  id?: string;
  userId?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryResponse = {
  data?: Category[];
  totalData?: number;
  currentPage?: number;
  totalPages?: number;
};

export type CategoryQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};
