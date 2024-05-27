"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import { getAllCharacters } from "../api/marvel/characters/get-all-character";
import CharacterCard from "@/components/marvel/characters/character-card";
import { ICharactersRoot } from "@/interfaces/marvel/characters";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import CharacterCardSkeleton from "@/components/marvel/characters/character-card-skeleton";

export default function CharactersPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? "1";

  const { data: characters, isLoading: isLoadingCharacters } =
    useQuery<ICharactersRoot>({
      queryKey: ["get-all-characters", page],
      queryFn: () =>
        getAllCharacters({
          search,
          page,
        }),
    });

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel heroes
        </Heading>
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {isLoadingCharacters ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <CharacterCardSkeleton key={i} />;
            })
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
        {characters && (
          <Pagination
            pageIndex={Number(page)}
            totalCount={characters.data.total}
            perPage={characters.data.count}
          />
        )}
      </Container>
    </Layout>
  );
}
