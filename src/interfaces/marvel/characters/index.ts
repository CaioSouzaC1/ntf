import { IBaseAuthParams } from "@/interfaces/api";
import { IData, IRoot } from "..";

export interface ICharactersRoot extends IRoot {
  data: ICharactersData;
}

export interface ICharactersData extends IData {
  results: ICharactersResult[];
}

export interface ICharactersResult {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComics;
  series: ISeries;
  stories: IStories;
  events: IEvents;
  urls: IUrl[];
}

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IComics {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface IItem {
  resourceURI: string;
  name: string;
}

export interface ISeries {
  available: number;
  collectionURI: string;
  items: IItem2[];
  returned: number;
}

export interface IItem2 {
  resourceURI: string;
  name: string;
}

export interface IStories {
  available: number;
  collectionURI: string;
  items: IItem3[];
  returned: number;
}

export interface IItem3 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface IEvents {
  available: number;
  collectionURI: string;
  items: IItem4[];
  returned: number;
}

export interface IItem4 {
  resourceURI: string;
  name: string;
}

export interface IUrl {
  type: string;
  url: string;
}

export interface IParameters extends IBaseAuthParams {
  nameStartsWith?: string;
  offset: number;
}
