"use client";
import Layout from "@/_layouts";

import Container from "@/components/container";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DollarSign, Info, X } from "lucide-react";
import NotFound from "@/components/not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getEventById } from "@/app/api/marvel/event/get-event-by-id";
import { IEventRoot } from "@/interfaces/marvel/event";
import { getEventCharactersById } from "@/app/api/marvel/event/characters/get-event-characters-by-id";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import CharacterCardSkeleton from "@/components/marvel/characters/character-card-skeleton";
import CharacterCard from "@/components/marvel/characters/character-card";
import CharacterCardNotFound from "@/components/marvel/characters/character-card-not-found";
import { getEventComicsById } from "@/app/api/marvel/event/comics/get-event-comics-by-id";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ComicsCarousel from "@/components/marvel/comics/carousel";
import { AUTOPLAY_DELAY } from "@/lib/constants";
import ComicsCarouselSkeleton from "@/components/marvel/comics/carousel-skeleton";

export default function EventPage({ params }: { params: { id: string } }) {
  const plugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  const {
    data: event,
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
  } = useQuery<IEventRoot>({
    queryKey: ["get-event"],
    queryFn: () => getEventById({ id: params.id }),
  });

  const { data: eventCharacters, isLoading: isLoadingEventCharacters } =
    useQuery<ICharacterRoot>({
      queryKey: ["get-event-character"],
      queryFn: () => getEventCharactersById({ id: params.id }, "1"),
    });

  const { data: eventComics, isLoading: isLoadingEventComics } =
    useQuery<IComicsRoot>({
      queryKey: ["get-event-comics"],
      queryFn: () => getEventComicsById({ id: params.id }),
    });

  if (isErrorEvent) {
    return <NotFound title="event" />;
  }

  if (event)
    console.log(
      `${event.data.results[0].thumbnail.path}.${event.data.results[0].thumbnail.extension}`
    );

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingEvent ? (
            <>
              <div className="relative aspect-w-16 aspect-h-5 overflow-hidden rounded-md col-span-1 min-w-20">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-40" />
              </div>
            </>
          ) : (
            <>
              {event && (
                <>
                  <div className="relative aspect-w-16 aspect-h-5 overflow-hidden rounded-md col-span-1 min-w-20 min-h-60">
                    <Image
                      src={`${event.data.results[0].thumbnail.path}.${event.data.results[0].thumbnail.extension}`}
                      alt={event.data.results[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all hover:scale-110"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-start gap-4">
                    <p className="font-bold text-base lg:text-4xl text-right">
                      {event.data.results[0].title}
                    </p>
                    <p className="text-xs">
                      {event.data.results[0].description}
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {isLoadingEventComics ? (
            <div className="col-span-2">
              <CardHeader className="py-2">
                <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                  Comics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="px-8">
                  <ComicsCarouselSkeleton />
                </div>
              </CardContent>
            </div>
          ) : (
            <>
              {eventComics && eventComics.data.total > 0 && (
                <div className="col-span-2">
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                      Comics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="px-4 lg:px-8">
                      <ComicsCarousel comics={eventComics} />
                    </div>
                  </CardContent>
                </div>
              )}
            </>
          )}
        </div>

        <p className="my-8 font-semibold text-2xl text-center hover:text-destructive transition-all">
          Comic charactes
        </p>
        <div className="mb-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoadingEventCharacters ? (
            Array.from({ length: 20 }).map((_, i) => {
              return <CharacterCardSkeleton key={i} />;
            })
          ) : (
            <>
              {eventCharacters?.data.results &&
              eventCharacters?.data.results.length > 0
                ? eventCharacters?.data.results.map((character) => {
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
      </Container>
    </Layout>
  );
}
