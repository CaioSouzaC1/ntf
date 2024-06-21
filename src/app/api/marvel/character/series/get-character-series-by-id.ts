import { IGetEntityById } from "@/interfaces/marvel";
import { ICharacterSeriesRoot } from "@/interfaces/marvel/character/series";
import api, { authInterceptor } from "@/services/api";

export async function getCharacterSeriesById({ id }: IGetEntityById) {
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
