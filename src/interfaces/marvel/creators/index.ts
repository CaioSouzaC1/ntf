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

export interface ICreatorsRoot extends IRoot {
  data: ICreatorsData;
}

export interface ICreatorsData extends IData {
  results: ICreatorsResult[];
}

export interface ICreatorsResult {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComics;
  series: ISeries;
  stories: IStories;
  events: IEvents;
  urls: IUrl[];
}
