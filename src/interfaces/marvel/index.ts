export interface IRoot {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
}

export interface IData {
  offset: number;
  limit: number;
  total: number;
  count: number;
}
