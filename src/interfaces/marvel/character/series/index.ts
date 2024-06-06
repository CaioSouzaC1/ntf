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
} from "../..";

export interface ICharacterSeriesRoot extends IRoot {
  data: ICharacterSeriesData;
}

export interface ICharacterSeriesData extends IData {
  results: ICharacterSeriesResult[];
}

export interface ICharacterSeriesResult {
  id: string;
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
  next: IItem;
  previous?: IItem;
}
