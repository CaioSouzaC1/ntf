import {
  ICharacters,
  IComics,
  ICreators,
  IData,
  IItem,
  IRoot,
  ISeries,
  IStories,
  IThumbnail,
  IUrl,
} from "..";

export interface IEventRoot extends IRoot {
  data: IEventData;
}

export interface IEventData extends IData {
  results: IEventResult[];
}
export interface IEventResult {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: IUrl[];
  modified: string;
  start: string;
  end: string;
  thumbnail: IThumbnail;
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  comics: IComics;
  series: ISeries;
  next: IItem;
  previous: IItem;
}
