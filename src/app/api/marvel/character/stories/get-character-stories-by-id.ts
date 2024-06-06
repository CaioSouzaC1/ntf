import { IGetCharacterById } from "@/interfaces/marvel/character";
import { ICharacterStoriesRoot } from "@/interfaces/marvel/character/stories";
import { IParameters } from "@/interfaces/marvel/characters";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getCharacterStoriesById(
  { id }: IGetCharacterById,
  page: string = "1"
) {
  const parameters: IParameters = {
    ...authInterceptor(),
    offset: MarvelUtils.multiplyPageToOffset(page ?? "1", 50),
    limit: 50,
  };

  try {
    const response = await api.get<ICharacterStoriesRoot>(
      `/v1/public/characters/${id}/stories`,
      {
        params: parameters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar séries do personagem!");
    throw error;
  }
}
