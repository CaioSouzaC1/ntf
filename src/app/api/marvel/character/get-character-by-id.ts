import {
  ICharacterRoot,
  IGetCharacterById,
} from "@/interfaces/marvel/character";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getCharacterById({ id }: IGetCharacterById) {
  try {
    const response = await api.get<ICharacterRoot>(
      `/v1/public/characters/${id}`,
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
