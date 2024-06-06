import {
  ICharacters,
  IComics,
  ICreators,
  IData,
  IEvents,
  IItem,
  IRoot,
  ISeries,
  IThumbnail,
} from "../..";

export interface ICharacterStoriesRoot extends IRoot {
  data: ICharacterStoriesData;
}

export interface ICharacterStoriesData extends IData {
  results: ICharacterStoriesResult[];
}

export interface ICharacterStoriesResult {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: IThumbnail;
  creators: ICreators;
  characters: ICharacters;
  series: ISeries;
  comics: IComics;
  events: IEvents;
  originalIssue: IItem;
}
