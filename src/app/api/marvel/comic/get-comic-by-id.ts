import { IGetEntityById } from "@/interfaces/marvel";
import { IComicRoot } from "@/interfaces/marvel/comic";
import api, { authInterceptor } from "@/services/api";

export async function getComicById({ id }: IGetEntityById) {
  try {
    const response = await api.get<IComicRoot>(`/v1/public/comics/${id}`, {
      params: { ...authInterceptor() },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
