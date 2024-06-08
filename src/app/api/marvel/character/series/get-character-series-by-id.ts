import { IGetCharacterById } from "@/interfaces/marvel/character";
import { ICharacterSeriesRoot } from "@/interfaces/marvel/character/series";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getCharacterSeriesById({ id }: IGetCharacterById) {
  try {
    const response = await api.get<ICharacterSeriesRoot>(
      `/v1/public/characters/${id}/series`,
      {
        params: { ...authInterceptor() },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
