import {
  ICharacters,
  IComics,
  ICreators,
  IData,
  IEvents,
  IItem,
  IRoot,
  IStories,
  IThumbnail,
  IUrl,
} from "..";

export interface ISerieRoot extends IRoot {
  data: ISerieData;
}

export interface ISerieData extends IData {
  results: ISerieResult[];
}
export interface ISerieResult {
  id: number;
  title: string;
  description: any;
  resourceURI: string;
  urls: IUrl[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: IThumbnail;
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  comics: IComics;
  events: IEvents;
  next: IItem;
  previous: IItem;
}
