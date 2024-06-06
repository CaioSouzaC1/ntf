"use client";
import Layout from "@/_layouts";
import { getCharacterById } from "@/app/api/marvel/character/get-character-by-id";
import { getCharacterComicsById } from "@/app/api/marvel/character/comics/get-character-comics-by-id";
import Container from "@/components/container";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ICharacterComicsRoot } from "@/interfaces/marvel/character/comics";
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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
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

export default function CharacterPage({ params }: { params: { id: string } }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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
  } = useQuery<ICharacterComicsRoot>({
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

  console.log(characterSeries);

  return (
    <Layout>
      <Container>
        {isErrorCharacter && <div>Error, character not found!</div>}
        {isErrorCharacterComics && (
          <div>Error, character comics not found!</div>
        )}
        {isErrorCharacterEvents && (
          <div>Error, character events not found!</div>
        )}
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
                    <p className="name-character">
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
                                    <Skeleton className="w-full h-56" />
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
                  {characterComics && characterComics.data.total > 0 && (
                    <div>
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
                              {characterComics.data.results.map(
                                (comic, index) => (
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
                                                {comic.creators.items.length >
                                                  0 && (
                                                  <div>
                                                    <CardHeader>
                                                      <CardTitle>
                                                        Creators
                                                      </CardTitle>
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
                                                            (
                                                              creator,
                                                              index
                                                            ) => (
                                                              <TableRow
                                                                key={index}>
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
                                                    <CardTitle>
                                                      Info data
                                                    </CardTitle>
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
            <div></div>
          ) : (
            <>
              {characterSeries && characterSeries.data.total > 0 && (
                <div className="col-span-1">
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all mb-12">
                      Series
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="px-4 lg:px-8">
                      <Carousel
                        orientation="vertical"
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        className="w-full">
                        <CarouselContent className="-mt-1 h-[42rem]">
                          {characterSeries.data.results.map((serie, index) => (
                            <CarouselItem
                              key={index}
                              className="pt-1 basis-2 md:basis-1/4">
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
                                          alt={serie.title}
                                          width={300}
                                          height={200}
                                          className="transition-all hover:scale-105 object-cover max-h-52"
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
        </div>
      </Container>
    </Layout>
  );
}
