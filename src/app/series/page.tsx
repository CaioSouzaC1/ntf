"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import CharacterCardSkeleton from "@/components/marvel/characters/character-card-skeleton";
import { useState } from "react";
import InputSearch from "@/components/search";
import CharacterCardNotFound from "@/components/marvel/characters/character-card-not-found";
import { getAllSeries } from "../api/marvel/series/get-all-series";
import SerieCard from "@/components/marvel/series/character-card";
import { ISeriesRoot } from "@/interfaces/marvel/series";

export default function SeriesPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const { data: series, isLoading: isLoadingSeries } = useQuery<ISeriesRoot>({
    queryKey: ["get-all-series", page, debouncedSearchTerm],
    queryFn: () =>
      getAllSeries({
        search: debouncedSearchTerm,
        page,
      }),
  });

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel series
        </Heading>
        <InputSearch
          placeholder="15 Love"
          page={page}
          handleSetSearch={setDebouncedSearchTerm}
        />
        <div className="mb-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {isLoadingSeries ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <CharacterCardSkeleton key={i} />;
            })
          ) : (
            <>
              {series?.data.results && series?.data.results.length > 0
                ? series?.data.results.map((serie) => {
                    return <SerieCard serie={serie} key={serie.id} />;
                  })
                : Array.from({ length: 8 }).map((_, i) => {
                    return <CharacterCardNotFound key={i} />;
                  })}
            </>
          )}
        </div>
        {series && (
          <Pagination pageIndex={Number(page)} totalCount={series.data.total} />
        )}
      </Container>
    </Layout>
  );
}
