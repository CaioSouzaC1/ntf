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
  TableCaption,
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

  console.log(characterComics);

  return (
    <Layout>
      <Container>
        {isErrorCharacter && <div>Error, character not found!</div>}
        {isErrorCharacterComics && (
          <div>Error, character comics not found!</div>
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
            <div className="px-4">
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
                  {characterComics && (
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
                                              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
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
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
