"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import InputSearch from "@/components/search";
import { getAllEvents } from "../api/marvel/events/get-all-events";
import { IEventsRoot } from "@/interfaces/marvel/events";
import EventCard from "@/components/marvel/events/event-card";
import EventCardSkeleton from "@/components/marvel/events/event-card-skeleton";
import EventCardNotFound from "@/components/marvel/events/event-card-not-found";

export default function CreatorsPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const { data: events, isLoading: isLoadingEvents } = useQuery<IEventsRoot>({
    queryKey: ["get-all-events", page, debouncedSearchTerm],
    queryFn: () =>
      getAllEvents({
        search: debouncedSearchTerm,
        page,
      }),
  });

  console.log(events);

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel events
        </Heading>
        <InputSearch
          placeholder="Age of"
          page={page}
          handleSetSearch={setDebouncedSearchTerm}
        />
        <div className="mb-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {isLoadingEvents ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <EventCardSkeleton key={i} />;
            })
          ) : (
            <>
              {events?.data.results && events?.data.results.length > 0
                ? events?.data.results.map((event) => {
                    return <EventCard event={event} key={event.id}></EventCard>;
                  })
                : Array.from({ length: 8 }).map((_, i) => {
                    return <EventCardNotFound key={i} />;
                  })}
            </>
          )}
        </div>
        {events && (
          <Pagination
            pageIndex={Number(page)}
            totalCount={events.data.total}
            perPage={events.data.count}
          />
        )}
      </Container>
    </Layout>
  );
}
