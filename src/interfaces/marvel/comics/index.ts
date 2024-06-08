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
  ITextObject,
  IThumbnail,
  IUrl,
  IVariant,
} from "..";

export interface IGetComicById {
  id: string;
}

export interface IComicsRoot extends IRoot {
  data: IComicsData;
}

export interface IComicsData extends IData {
  results: IComicsResult[];
}

export interface IComicsResult {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description?: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: ITextObject[];
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
