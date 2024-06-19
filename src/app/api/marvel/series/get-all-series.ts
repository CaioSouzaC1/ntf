import { IBaseQueryParams } from "@/interfaces/api";
import { IParameters } from "@/interfaces/marvel/characters";
import { ISeriesRoot } from "@/interfaces/marvel/series";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";

export async function getAllSeries({ search, page }: IBaseQueryParams) {
  try {
    const parameters: IParameters = {
      ...authInterceptor(),
      offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
    };

    if (search) parameters.titleStartsWith = search;
    const response = await api.get<ISeriesRoot>("/v1/public/series", {
      params: parameters,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
