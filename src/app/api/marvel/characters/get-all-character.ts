import { IRoot } from "@/interfaces/marvel";
import { ICharactersRoot } from "@/interfaces/marvel/characters";
import api, { authInterceptor } from "@/services/api";
import { toast } from "sonner";

export async function getAllCharacters() {
  try {
    const response = await api.get<ICharactersRoot>("/v1/public/characters", {
      params: {
        ...authInterceptor(),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao consultar personagens!");
    throw error;
  }
}
