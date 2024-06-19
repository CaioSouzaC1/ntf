import { IGetCharacterById } from "@/interfaces/marvel/character";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import api, { authInterceptor } from "@/services/api";

export async function getEventComicsById({ id }: IGetCharacterById) {
  try {
    const response = await api.get<IComicsRoot>(
      `/v1/public/events/${id}/comics`,
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
