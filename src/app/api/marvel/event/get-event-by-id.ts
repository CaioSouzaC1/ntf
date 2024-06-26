import { IGetEntityById } from "@/interfaces/marvel";
import { IEventRoot } from "@/interfaces/marvel/event";
import api, { authInterceptor } from "@/services/api";

export async function getEventById({ id }: IGetEntityById) {
  try {
    const response = await api.get<IEventRoot>(`/v1/public/events/${id}`, {
      params: { ...authInterceptor() },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
