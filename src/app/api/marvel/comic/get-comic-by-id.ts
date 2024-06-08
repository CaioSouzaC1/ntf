import { IComicRoot } from "@/interfaces/marvel/comic";
import { IGetComicById } from "@/interfaces/marvel/comics";
import api, { authInterceptor } from "@/services/api";

export async function getComicById({ id }: IGetComicById) {
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
