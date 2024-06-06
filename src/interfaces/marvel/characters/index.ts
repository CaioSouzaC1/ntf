import { IBaseAuthParams } from "@/interfaces/api";
import {
  IComics,
  IData,
  IEvents,
  IRoot,
  ISeries,
  IStories,
  IThumbnail,
  IUrl,
} from "..";

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

export interface IParameters extends IBaseAuthParams {
  nameStartsWith?: string;
  offset: number;
  limit?: number;
}
