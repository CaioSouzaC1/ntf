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
import { useState } from "react";
import InputSearch from "@/components/search";
import CharacterCardNotFound from "@/components/marvel/characters/character-card-not-found";

export default function CharactersPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const { data: characters, isLoading: isLoadingCharacters } =
    useQuery<ICharactersRoot>({
      queryKey: ["get-all-characters", page, debouncedSearchTerm],
      queryFn: () =>
        getAllCharacters({
          search: debouncedSearchTerm,
          page,
        }),
    });

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel heroes
        </Heading>
        <InputSearch
          placeholder="Hulk"
          page={page}
          handleSetSearch={setDebouncedSearchTerm}
        />
        <div className="mb-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {isLoadingCharacters ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <CharacterCardSkeleton key={i} />;
            })
          ) : (
            <>
              {characters?.data.results && characters?.data.results.length > 0
                ? characters?.data.results.map((character) => {
                    return (
                      <CharacterCard
                        character={character}
                        key={character.id}></CharacterCard>
                    );
                  })
                : Array.from({ length: 8 }).map((_, i) => {
                    return <CharacterCardNotFound key={i} />;
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
