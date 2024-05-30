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

export interface IGetCharacterById {
  id: string;
}

export interface ICharacterRoot extends IRoot {
  data: ICharacterData;
}

export interface ICharacterData extends IData {
  results: ICharacterResult[];
}

export interface ICharacterResult {
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
