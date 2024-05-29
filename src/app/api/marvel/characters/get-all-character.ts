import { IBaseQueryParams } from "@/interfaces/api";
import { ICharactersRoot, IParameters } from "@/interfaces/marvel/characters";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getAllCharacters({ search, page }: IBaseQueryParams) {
  try {
    const parameters: IParameters = {
      ...authInterceptor(),
      offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
    };

    if (search) parameters.nameStartsWith = search;
    const response = await api.get<ICharactersRoot>("/v1/public/characters", {
      params: parameters,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar personagens!");
    throw error;
  }
}
