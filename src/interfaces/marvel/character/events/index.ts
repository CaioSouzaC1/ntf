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
} from "../..";

export interface ICharacterEventsRoot extends IRoot {
  data: ICharacterEventsData;
}

export interface ICharacterEventsData extends IData {
  results: ICharacterEventsResult[];
}

export interface ICharacterEventsResult {
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
