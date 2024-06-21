import { IGetEntityById } from "@/interfaces/marvel";
import { ICharacterEventsRoot } from "@/interfaces/marvel/character/events";
import api, { authInterceptor } from "@/services/api";

export async function getCharacterEventsById({ id }: IGetEntityById) {
  try {
    const response = await api.get<ICharacterEventsRoot>(
      `/v1/public/characters/${id}/events`,
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
