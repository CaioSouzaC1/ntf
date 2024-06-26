import { IGetEntityById } from "@/interfaces/marvel";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import api, { authInterceptor } from "@/services/api";

export async function getCharacterById({ id }: IGetEntityById) {
  try {
    const response = await api.get<ICharacterRoot>(
      `/v1/public/characters/${id}`,
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
