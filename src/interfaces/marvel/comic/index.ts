import {
  ICharacters,
  ICreators,
  IData,
  IDate,
  IEvents,
  IImage,
  IItem,
  IPrice,
  IRoot,
  ISeries,
  IStories,
  IThumbnail,
  IUrl,
  IVariant,
} from "..";

export interface IComicRoot extends IRoot {
  data: IComicData;
}

export interface IComicData extends IData {
  results: IComicResult[];
}
export interface IComicResult {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: any[];
  resourceURI: string;
  urls: IUrl[];
  series: ISeries;
  variants: IVariant[];
  collections: IItem[];
  collectedIssues: IItem[];
  dates: IDate[];
  prices: IPrice[];
  thumbnail: IThumbnail;
  images: IImage[];
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  events: IEvents;
}

export interface Url {
  type: string;
  url: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Date {
  type: string;
  date: string;
}

export interface Price {
  type: string;
  price: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

export interface Item2 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}
