import { IGetEntityById } from "@/interfaces/marvel";
import { ISerieRoot } from "@/interfaces/marvel/serie";
import api, { authInterceptor } from "@/services/api";

export async function getSerieById({ id }: IGetEntityById) {
  try {
    const response = await api.get<ISerieRoot>(`/v1/public/series/${id}`, {
      params: { ...authInterceptor() },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
