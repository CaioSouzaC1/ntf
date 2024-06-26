"use client";
import Layout from "@/_layouts";
import { getCharacterById } from "@/app/api/marvel/character/get-character-by-id";
import { getCharacterComicsById } from "@/app/api/marvel/character/comics/get-character-comics-by-id";
import Container from "@/components/container";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { MarvelUtils } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { getCharacterEventsById } from "@/app/api/marvel/character/events/get-character-events-by-id";
import { ICharacterEventsRoot } from "@/interfaces/marvel/character/events";
import { ICharacterSeriesRoot } from "@/interfaces/marvel/character/series";
import { getCharacterSeriesById } from "@/app/api/marvel/character/series/get-character-series-by-id";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICharacterStoriesRoot } from "@/interfaces/marvel/character/stories";
import { getCharacterStoriesById } from "@/app/api/marvel/character/stories/get-character-stories-by-id";
import NotFound from "@/components/not-found";
import ComicsCarousel from "@/components/marvel/comics/carousel";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import { AUTOPLAY_DELAY } from "@/lib/constants";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import ComicsCarouselSkeleton from "@/components/marvel/comics/carousel-skeleton";

export default function CharacterPage({ params }: { params: { id: string } }) {
  const plugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isErrorCharacter,
  } = useQuery<ICharacterRoot>({
    queryKey: ["get-character"],
    queryFn: () => getCharacterById({ id: params.id }),
  });

  const {
    data: characterComics,
    isLoading: isLoadingCharacterComics,
    isError: isErrorCharacterComics,
  } = useQuery<IComicsRoot>({
    queryKey: ["get-character-comics"],
    queryFn: () => getCharacterComicsById({ id: params.id }),
  });

  const {
    data: characterEvents,
    isLoading: isLoadingCharacterEvents,
    isError: isErrorCharacterEvents,
  } = useQuery<ICharacterEventsRoot>({
    queryKey: ["get-character-events"],
    queryFn: () => getCharacterEventsById({ id: params.id }),
  });

  const {
    data: characterSeries,
    isLoading: isLoadingCharacterSeries,
    isError: isErrorCharacterSeries,
  } = useQuery<ICharacterSeriesRoot>({
    queryKey: ["get-character-series"],
    queryFn: () => getCharacterSeriesById({ id: params.id }),
  });

  const {
    data: characterStories,
    isLoading: isLoadingCharacterStories,
    isError: isErrorCharacterStories,
  } = useQuery<ICharacterStoriesRoot>({
    queryKey: ["get-character-stories"],
    queryFn: () => getCharacterStoriesById({ id: params.id }),
  });

  if (isErrorCharacter) {
    return <NotFound title="character" />;
  }

  if (character)
    console.log(
      `${character.data.results[0].thumbnail.path}.${character.data.results[0].thumbnail.extension}`
    );

  return (
    <Layout>
      <Container>
        <div className="flex flex-wrap">
          <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md w-full lg:w-1/3">
            {isLoadingCharacter ? (
              <>
                <Skeleton className="clip-character" />
                <Skeleton className="name-character-skeleton min-h-12 min-w-[85%]" />
              </>
            ) : (
              <>
                {character && (
                  <>
                    <Image
                      src={`${character.data.results[0].thumbnail.path}.${character.data.results[0].thumbnail.extension}`}
                      alt={character.data.results[0].name}
                      layout="fill"
                      objectFit="cover"
                      className="clip-character transition-all hover:scale-110"
                    />
                    <p className="name-character hover:text-destructive transition-all line-clamp-2">
                      {character.data.results[0].name}
                    </p>
                  </>
                )}
              </>
            )}
          </div>

          <div className="w-full lg:w-2/3 my-4 lg:my-0">
            <div className="lg:px-4">
              {isLoadingCharacterComics ? (
                <div>
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
                  {characterComics && characterComics.data.total > 0 && (
                    <div>
                      <CardHeader className="py-2">
                        <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                          Comics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="px-4 lg:px-8">
                          <ComicsCarousel comics={characterComics} />
                        </div>
                      </CardContent>
                    </div>
                  )}
                </>
              )}

              {isLoadingCharacterEvents ? (
                <div>
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                      Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="px-4 lg:px-8">
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
                                    <Skeleton className="w-full h-48" />
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
                  {characterEvents && characterEvents.data.total > 0 && (
                    <div>
                      <CardHeader className="py-2">
                        <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                          Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="px-4 lg:px-8">
                          <Carousel
                            plugins={[plugin.current]}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}>
                            <CarouselContent>
                              {characterEvents.data.results.map(
                                (event, index) => (
                                  <CarouselItem
                                    className="md:basis-1/2 lg:basis-1/3"
                                    key={index}>
                                    <div className="p-1">
                                      <Card>
                                        <CardHeader className="pb-0">
                                          <CardTitle className="block line-clamp-2 min-h-10 text-sm">
                                            {event.title}
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex items-center justify-center p-6">
                                          <Drawer>
                                            <DrawerTrigger>
                                              <Image
                                                src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                                                alt={event.title}
                                                width={300}
                                                height={400}
                                                className="transition-all hover:scale-105 object-cover"
                                              />
                                            </DrawerTrigger>
                                            <DrawerContent>
                                              <DrawerHeader>
                                                <DrawerTitle>
                                                  {event.title}
                                                </DrawerTitle>
                                                <DrawerDescription>
                                                  {event.description}
                                                </DrawerDescription>
                                              </DrawerHeader>

                                              <DrawerFooter>
                                                <DrawerClose className="flex justify-end">
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
                                )
                              )}
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8">
          {isLoadingCharacterSeries ? (
            <div className="col-span-2">
              <CardHeader className="py-2">
                <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all mb-12">
                  Series
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="px-4 lg:px-8">
                  <Carousel
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full">
                    <CarouselContent className="-mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          className="md:basis-1/2 lg:basis-1/3"
                          key={index}>
                          <div className="p-1">
                            <Card>
                              <CardHeader className="pb-0">
                                <CardTitle className="block line-clamp-2 min-h-10 text-sm">
                                  <Skeleton className="w-full h-8" />
                                </CardTitle>
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
              {characterSeries && characterSeries.data.total > 0 && (
                <div className="col-span-2">
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all mb-12">
                      Series
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="px-4 lg:px-8">
                      <Carousel
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        className="w-full">
                        <CarouselContent className="-mt-1">
                          {characterSeries.data.results.map((serie, index) => (
                            <CarouselItem
                              className="md:basis-1/2 lg:basis-1/3"
                              key={index}>
                              <div className="p-1">
                                <Card>
                                  <CardHeader className="pb-0">
                                    <CardTitle className="block line-clamp-2 min-h-10 text-sm">
                                      {serie.title}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex items-center justify-center p-6">
                                    <Sheet>
                                      <SheetTrigger>
                                        <Image
                                          src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                                          alt={"serie image"}
                                          width={100}
                                          height={140}
                                          className="block h-36 w-full hover:brightness-125 transition-all hover:scale-110 object-cover"
                                        />
                                      </SheetTrigger>
                                      <SheetContent>
                                        <SheetHeader>
                                          <SheetTitle>{serie.title}</SheetTitle>
                                          <SheetDescription>
                                            {serie.description}
                                          </SheetDescription>
                                        </SheetHeader>
                                        <div>
                                          <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md my-8">
                                            <Image
                                              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                                              alt={serie.title}
                                              layout="fill"
                                              objectFit="cover"
                                              className=" hover:brightness-125 transition-all hover:scale-110"
                                            />
                                          </div>
                                          <Table>
                                            <TableBody>
                                              <TableRow>
                                                <TableCell className="font-medium">
                                                  Id
                                                </TableCell>
                                                <TableCell className="text-right">
                                                  {MarvelUtils.notFoundVerification(
                                                    serie.id
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                              <TableRow>
                                                <TableCell className="font-medium">
                                                  Start year
                                                </TableCell>
                                                <TableCell className="text-right">
                                                  {MarvelUtils.notFoundVerification(
                                                    serie.startYear
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                              <TableRow>
                                                <TableCell className="font-medium">
                                                  End year
                                                </TableCell>
                                                <TableCell className="text-right">
                                                  {MarvelUtils.notFoundVerification(
                                                    serie.endYear
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            </TableBody>
                                          </Table>
                                        </div>
                                      </SheetContent>
                                    </Sheet>
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

          {isLoadingCharacterStories ? (
            <div className="col-span-1">
              <CardHeader className="py-2">
                <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all mb-12">
                  Stories
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-scroll">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Skeleton className="w-full h-4 mb-2" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </div>
          ) : (
            <>
              {characterStories && characterStories.data.total > 0 && (
                <div className="col-span-1">
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all mb-12">
                      Stories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-64 overflow-y-scroll">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">Title</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {characterStories.data.results.map((storie, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <p className="line-clamp-1">{storie.title}</p>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}
