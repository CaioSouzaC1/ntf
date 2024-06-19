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
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { MarvelUtils } from "@/lib/utils";
import Link from "next/link";

export default function EventPage({ params }: { params: { id: string } }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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
                  <Carousel
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          className="md:basis-1/2 lg:basis-1/3"
                          key={index}>
                          <div className="p-1">
                            <Card>
                              <CardHeader className="pb-0">
                                <Skeleton className="w-full h-3" />
                                <Skeleton className="w-full h-3" />
                              </CardHeader>
                              <CardContent className="flex items-center justify-center p-6">
                                <Skeleton className="w-full h-36" />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
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
                      <Carousel
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}>
                        <CarouselContent>
                          {eventComics.data.results.map((comic, index) => (
                            <CarouselItem
                              className="md:basis-1/2 lg:basis-1/3"
                              key={index}>
                              <div className="p-1">
                                <Card>
                                  <CardHeader className="pb-0">
                                    <CardTitle className="block line-clamp-2 min-h-10 text-sm">
                                      {comic.title}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex items-center justify-center p-6">
                                    <Drawer>
                                      <DrawerTrigger>
                                        <Image
                                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                          alt={comic.title}
                                          width={300}
                                          height={400}
                                          className="transition-all hover:scale-105 object-cover"
                                        />
                                      </DrawerTrigger>
                                      <DrawerContent>
                                        <DrawerHeader>
                                          <DrawerTitle>
                                            {comic.title}
                                          </DrawerTitle>
                                          <DrawerDescription>
                                            {comic.description}
                                          </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 max-h-[50vh] overflow-y-auto">
                                          {comic.creators.items.length > 0 && (
                                            <div>
                                              <CardHeader>
                                                <CardTitle>Creators</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                <Table>
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead>
                                                        Name
                                                      </TableHead>
                                                      <TableHead>
                                                        Role
                                                      </TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {comic.creators.items.map(
                                                      (creator, index) => (
                                                        <TableRow key={index}>
                                                          <TableCell className="font-medium">
                                                            {MarvelUtils.notFoundVerification(
                                                              creator.name
                                                            )}
                                                          </TableCell>
                                                          <TableCell className="capitalize">
                                                            {MarvelUtils.notFoundVerification(
                                                              creator.role
                                                            )}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    )}
                                                  </TableBody>
                                                </Table>
                                              </CardContent>
                                            </div>
                                          )}

                                          <div>
                                            <CardHeader>
                                              <CardTitle>Info data</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                              <Table>
                                                <TableBody>
                                                  <TableRow>
                                                    <TableCell className="font-medium">
                                                      Diamond code
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                      {MarvelUtils.notFoundVerification(
                                                        comic.diamondCode
                                                      )}
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell className="font-medium">
                                                      Page count
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                      {MarvelUtils.notFoundVerification(
                                                        comic.pageCount
                                                      )}
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell className="font-medium">
                                                      Digital id
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                      {MarvelUtils.notFoundVerification(
                                                        comic.digitalId
                                                      )}
                                                    </TableCell>
                                                  </TableRow>
                                                  <TableRow>
                                                    <TableCell className="font-medium">
                                                      Upc
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                      {MarvelUtils.notFoundVerification(
                                                        comic.upc
                                                      )}
                                                    </TableCell>
                                                  </TableRow>
                                                </TableBody>
                                              </Table>
                                            </CardContent>
                                          </div>
                                        </div>
                                        <DrawerFooter>
                                          <DrawerClose className="flex justify-between">
                                            <Link href={`/comic/${comic.id}`}>
                                              <Button
                                                className="flex gap-4 font-bold"
                                                variant="secondary">
                                                <span>
                                                  See comic internal page
                                                </span>
                                                <Info className="w-4" />
                                              </Button>
                                            </Link>
                                            <Button
                                              className="flex gap-4 font-bold"
                                              variant="destructive">
                                              <span>Close</span>
                                              <X className="w-4" />
                                            </Button>
                                          </DrawerClose>
                                        </DrawerFooter>
                                      </DrawerContent>
                                    </Drawer>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
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
