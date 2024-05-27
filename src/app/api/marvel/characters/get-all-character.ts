import { IBaseQueryParams } from "@/interfaces/api";
import { ICharactersRoot } from "@/interfaces/marvel/characters";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getAllCharacters({ search, page }: IBaseQueryParams) {
  try {
    const response = await api.get<ICharactersRoot>("/v1/public/characters", {
      params: {
        ...authInterceptor(),
        search,
        offset: MarvelUtils.multiplyPageToOffset(page ?? "1"),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar personagens!");
    throw error;
  }
}
