"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import InputSearch from "@/components/search";
import { getAllComics } from "../api/marvel/comics/get-all-comics";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import ComicCard from "@/components/marvel/comics/comic-card";
import ComicCardSkeleton from "@/components/marvel/comics/comic-card-skeleton";
import ComicCardNotFound from "@/components/marvel/comics/comic-card-not-found";

export default function ComicsPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const { data: comics, isLoading: isLoadingComics } = useQuery<IComicsRoot>({
    queryKey: ["get-all-comics", page, debouncedSearchTerm],
    queryFn: () =>
      getAllComics({
        search: debouncedSearchTerm,
        page,
      }),
  });

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel comics
        </Heading>
        <InputSearch
          placeholder="Spider"
          page={page}
          handleSetSearch={setDebouncedSearchTerm}
        />
        <div className="mb-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {isLoadingComics ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <ComicCardSkeleton key={i} />;
            })
          ) : (
            <>
              {comics?.data.results && comics?.data.results.length > 0
                ? comics?.data.results.map((comic) => {
                    return <ComicCard comic={comic} key={comic.id} />;
                  })
                : Array.from({ length: 8 }).map((_, i) => {
                    return <ComicCardNotFound key={i} />;
                  })}
            </>
          )}
        </div>
        {comics && (
          <Pagination pageIndex={Number(page)} totalCount={comics.data.total} />
        )}
      </Container>
    </Layout>
  );
}
