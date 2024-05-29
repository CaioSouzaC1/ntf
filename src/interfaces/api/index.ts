export interface IBaseQueryParams {
  search?: string | null;
  page?: string | null;
}

export interface IBaseAuthParams {
  offset: number;
  apikey: string | undefined;
  ts: string;
  hash: string;
}

export interface IBaseSearchParams {
  placeholder: string;
  page: string;
  handleSetSearch: (searchTerm: string) => void;
}