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

export interface IEventsRoot extends IRoot {
  data: IEventsData;
}

export interface IEventsData extends IData {
  results: IEventsResult[];
}

export interface IEventsResult {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: IUrl[];
  modified: string;
  start?: string;
  end?: string;
  thumbnail: IThumbnail;
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  comics: IComics;
  series: ISeries;
  next?: IItem;
  previous?: IItem;
}
