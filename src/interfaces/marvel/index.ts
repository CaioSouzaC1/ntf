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

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IItem {
  resourceURI: string;
  name: string;
}

export interface IItem2 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface IComics {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface ISeries {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface IStories {
  available: number;
  collectionURI: string;
  items: IItem2[];
  returned: number;
}

export interface IEvents {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface ICreators {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}
export interface IUrl {
  type: string;
  url: string;
}

export interface ITextObject {
  type: string;
  language: string;
  text: string;
}

export interface IVariant {
  resourceURI: string;
  name: string;
}

export interface IDate {
  type: string;
  date: string;
}

export interface IPrice {
  type: string;
  price: number;
}

export interface IImage {
  path: string;
  extension: string;
}

export interface ICharacters {
  available: number;
  collectionURI: string;
  items: IItem2[];
  returned: number;
}