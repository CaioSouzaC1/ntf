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
