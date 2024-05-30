"use client";
import Layout from "@/_layouts";
import { getCharacterById } from "@/app/api/marvel/character/get-character-by-id";
import Container from "@/components/container";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import { useQuery } from "@tanstack/react-query";

export default function CharacterPage({ params }: { params: { id: string } }) {
  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isErrorCharacter,
  } = useQuery<ICharacterRoot>({
    queryKey: ["get-all-characters"],
    queryFn: () => getCharacterById({ id: params.id }),
  });

  console.log(character?.data.results);

  return (
    <Layout>
      <Container>
        <div>My character id: {params.id}</div>
        {character && <p>{character.data.results[0].name}</p>}
      </Container>
    </Layout>
  );
}
