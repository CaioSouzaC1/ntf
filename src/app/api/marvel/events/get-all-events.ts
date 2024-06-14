import { IBaseQueryParams } from "@/interfaces/api";
import { IParameters } from "@/interfaces/marvel/characters";
import { IEventsRoot } from "@/interfaces/marvel/events";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";

export async function getAllEvents({ search, page }: IBaseQueryParams) {
  try {
    const parameters: IParameters = {
      ...authInterceptor(),
      offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
    };

    if (search) parameters.nameStartsWith = search;
    const response = await api.get<IEventsRoot>("/v1/public/events", {
      params: parameters,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
