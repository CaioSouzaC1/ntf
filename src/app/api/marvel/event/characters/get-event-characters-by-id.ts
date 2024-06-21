import { IGetEntityById } from "@/interfaces/marvel";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import { IParameters } from "@/interfaces/marvel/characters";
import { MarvelUtils } from "@/lib/utils";
import api, { authInterceptor } from "@/services/api";

export async function getEventCharactersById(
  { id }: IGetEntityById,
  page: string = "1"
) {
  const parameters: IParameters = {
    ...authInterceptor(),
    offset: MarvelUtils.multiplyPageToOffset(page ?? "1", 50),
    limit: 50,
  };

  try {
    const response = await api.get<ICharacterRoot>(
      `/v1/public/events/${id}/characters`,
      {
        params: parameters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
