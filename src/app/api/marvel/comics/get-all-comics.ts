import { IBaseQueryParams } from "@/interfaces/api";
import { IParameters } from "@/interfaces/marvel/characters";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getAllComics({ search, page }: IBaseQueryParams) {
  try {
    const parameters: IParameters = {
      ...authInterceptor(),
      offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
    };

    if (search) parameters.titleStartsWith = search;
    const response = await api.get<IComicsRoot>("/v1/public/comics", {
      params: parameters,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar personagens!");
    throw error;
  }
}
