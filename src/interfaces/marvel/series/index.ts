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

export interface IGetSerieById {
  id: string;
}

export interface ISeriesRoot extends IRoot {
  data: ISeriesData;
}

export interface ISeriesData extends IData {
  results: ISeriesResult[];
}

export interface ISeriesResult {
  id: number;
  title: string;
  description?: string;
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
  next?: IItem;
  previous: IItem;
}
