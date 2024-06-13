import { IBaseQueryParams } from "@/interfaces/api";
import { IParameters } from "@/interfaces/marvel/characters";
import { ICreatorsRoot } from "@/interfaces/marvel/creators";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";

export async function getAllCreators({ search, page }: IBaseQueryParams) {
  try {
    const parameters: IParameters = {
      ...authInterceptor(),
      offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
    };

    if (search) parameters.nameStartsWith = search;
    const response = await api.get<ICreatorsRoot>("/v1/public/creators", {
      params: parameters,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
