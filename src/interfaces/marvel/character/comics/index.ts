import {
  ICharacters,
  ICreators,
  IData,
  IEvents,
  IImage,
  IPrice,
  IRoot,
  ISeries,
  IStories,
  ITextObject,
  IThumbnail,
  IUrl,
  IVariant,
} from "../..";

export interface ICharacterComicsRoot extends IRoot {
  data: ICharacterComicsData;
}

export interface ICharacterComicsData extends IData {
  results: ICharacterComicsResult[];
}

export interface ICharacterComicsResult {
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
  textObjects: ITextObject[];
  resourceURI: string;
  urls: IUrl[];
  series: ISeries;
  variants: IVariant[];
  collections: any[];
  collectedIssues: any[];
  dates: Date[];
  prices: IPrice[];
  thumbnail: IThumbnail;
  images: IImage[];
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  events: IEvents;
}
