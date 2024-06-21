import { IGetEntityById } from "@/interfaces/marvel";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import api, { authInterceptor } from "@/services/api";

export async function getSerieComicsById({ id }: IGetEntityById) {
  try {
    const response = await api.get<IComicsRoot>(
      `/v1/public/series/${id}/comics`,
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
