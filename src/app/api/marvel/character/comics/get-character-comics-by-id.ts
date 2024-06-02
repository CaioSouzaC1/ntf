import { IGetCharacterById } from "@/interfaces/marvel/character";
import { ICharacterComicsRoot } from "@/interfaces/marvel/character/comics";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getCharacterComicsById({ id }: IGetCharacterById) {
  try {
    const response = await api.get<ICharacterComicsRoot>(
      `/v1/public/characters/${id}/comics`,
      {
        params: { ...authInterceptor() },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar dados do personagem!");
    throw error;
  }
}
