"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { IRoot } from "@/interfaces/marvel";
import { useQuery } from "@tanstack/react-query";
import { getAllCharacters } from "../api/marvel/characters/get-all-character";
import CharacterCard from "@/components/marvel/characters/character-card";
import { ICharactersRoot } from "@/interfaces/marvel/characters";

export default function CharactersPage() {
  const { data: characters, isLoading: isLoadingCharacters } =
    useQuery<ICharactersRoot>({
      queryKey: ["get-all-characters"],
      queryFn: () => getAllCharacters(),
    });

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel heroes
        </Heading>
        <div className="my-8 flex gap-4 flex-wrap">
          {isLoadingCharacters ? (
            <div>carregando</div>
          ) : (
            <>
              {characters?.data.results.map((character) => {
                return (
                  <CharacterCard
                    character={character}
                    key={character.id}></CharacterCard>
                );
              })}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}
