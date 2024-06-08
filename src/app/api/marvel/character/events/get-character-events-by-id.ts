import { IGetCharacterById } from "@/interfaces/marvel/character";
import { ICharacterEventsRoot } from "@/interfaces/marvel/character/events";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getCharacterEventsById({ id }: IGetCharacterById) {
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
