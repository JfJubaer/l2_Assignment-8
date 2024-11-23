export type ILoginUser = {
    email: string,
  password: string
}

export type IBookFilterRequest = {
  searchTerm?: string | undefined;
  category?: string | undefined;
  maxPrice?: number| undefined;
  minPrice?: number | undefined;
}
