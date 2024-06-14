"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import InputSearch from "@/components/search";
import { getAllCreators } from "../api/marvel/creators/get-all-creators";
import { ICreatorsRoot } from "@/interfaces/marvel/creators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MarvelUtils } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreatorsPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const { data: creators, isLoading: isLoadingCreators } =
    useQuery<ICreatorsRoot>({
      queryKey: ["get-all-creators", page, debouncedSearchTerm],
      queryFn: () =>
        getAllCreators({
          search: debouncedSearchTerm,
          page,
        }),
    });

  console.log(creators);

  return (
    <Layout>
      <Container>
        <Heading className="text-center" size={"2xl"}>
          See Marvel creators
        </Heading>
        <InputSearch
          placeholder="Hulk"
          page={page}
          handleSetSearch={setDebouncedSearchTerm}
        />
        <div className="mb-8 mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-16">Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingCreators ? (
                Array.from({ length: 20 }).map((_, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <Skeleton className="w-14 h-4"></Skeleton>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Skeleton className="w-24 h-4"></Skeleton>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={true}
                          size={"icon"}
                          variant={"secondary"}>
                          <Info className="w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <>
                  {creators?.data.results && creators?.data.results.length > 0
                    ? creators?.data.results.map((creator) => {
                        return (
                          <TableRow key={creator.id}>
                            <TableCell className="font-medium">
                              {creator.id}
                            </TableCell>
                            <TableCell className="font-medium">
                              {creator.fullName}
                            </TableCell>
                            <TableCell>
                              <Drawer>
                                <DrawerTrigger>
                                  <Button size={"icon"} variant={"secondary"}>
                                    <Info className="w-4" />
                                  </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                  <DrawerHeader>
                                    <DrawerTitle>
                                      {creator.fullName} ({creator.id})
                                    </DrawerTitle>
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                      {creator.comics.items.length > 0 && (
                                        <div className="col-span-1 p-4 mt-4">
                                          <CardHeader>
                                            <CardTitle>
                                              Creator comics
                                            </CardTitle>
                                          </CardHeader>
                                          <Carousel>
                                            <CarouselContent>
                                              {creator.comics.items.map(
                                                (comic, index) => (
                                                  <CarouselItem
                                                    key={index}
                                                    className="basis-1/2">
                                                    <Card className="p-4 min-h-40 flex flex-col justify-between">
                                                      {comic.name}
                                                      <Link
                                                        href={`/comic/${MarvelUtils.extractNumbersFromUrl(
                                                          comic.resourceURI
                                                        )}`}>
                                                        <Button
                                                          className="w-full"
                                                          variant={"outline"}>
                                                          See comic internal
                                                          page
                                                        </Button>
                                                      </Link>
                                                    </Card>
                                                  </CarouselItem>
                                                )
                                              )}
                                            </CarouselContent>
                                          </Carousel>
                                        </div>
                                      )}
                                      {creator.events.items.length > 0 && (
                                        <div className="col-span-1 p-4 mt-4">
                                          <CardHeader>
                                            <CardTitle>
                                              Creator events
                                            </CardTitle>
                                          </CardHeader>
                                          <Carousel>
                                            <CarouselContent>
                                              {creator.events.items.map(
                                                (event, index) => (
                                                  <CarouselItem
                                                    key={index}
                                                    className="basis-1/2">
                                                    <Card className="p-4 min-h-40 flex flex-col justify-between">
                                                      {event.name}
                                                      <Link
                                                        href={`/event/${MarvelUtils.extractNumbersFromUrl(
                                                          event.resourceURI
                                                        )}`}>
                                                        <Button
                                                          className="w-full"
                                                          variant={"outline"}>
                                                          See event internal
                                                          page
                                                        </Button>
                                                      </Link>
                                                    </Card>
                                                  </CarouselItem>
                                                )
                                              )}
                                            </CarouselContent>
                                          </Carousel>
                                        </div>
                                      )}
                                      {creator.stories.items.length > 0 && (
                                        <div className="col-span-1 p-4 mt-4">
                                          <CardHeader>
                                            <CardTitle>
                                              Creator stories
                                            </CardTitle>
                                          </CardHeader>
                                          <Carousel>
                                            <CarouselContent>
                                              {creator.stories.items.map(
                                                (storie, index) => (
                                                  <CarouselItem
                                                    key={index}
                                                    className="basis-1/2">
                                                    <Card className="p-4 min-h-40 flex flex-col justify-between">
                                                      {storie.name}
                                                      <Link
                                                        href={`/storie/${MarvelUtils.extractNumbersFromUrl(
                                                          storie.resourceURI
                                                        )}`}>
                                                        <Button
                                                          className="w-full"
                                                          variant={"outline"}>
                                                          See storie internal
                                                          page
                                                        </Button>
                                                      </Link>
                                                    </Card>
                                                  </CarouselItem>
                                                )
                                              )}
                                            </CarouselContent>
                                          </Carousel>
                                        </div>
                                      )}
                                      {creator.series.items.length > 0 && (
                                        <div className="col-span-1 p-4 mt-4">
                                          <CardHeader>
                                            <CardTitle>
                                              Creator series
                                            </CardTitle>
                                          </CardHeader>
                                          <Carousel>
                                            <CarouselContent>
                                              {creator.series.items.map(
                                                (serie, index) => (
                                                  <CarouselItem
                                                    key={index}
                                                    className="basis-1/2">
                                                    <Card className="p-4 min-h-40 flex flex-col justify-between">
                                                      {serie.name}
                                                      <Link
                                                        href={`/serie/${MarvelUtils.extractNumbersFromUrl(
                                                          serie.resourceURI
                                                        )}`}>
                                                        <Button
                                                          className="w-full"
                                                          variant={"outline"}>
                                                          See serie internal
                                                          page
                                                        </Button>
                                                      </Link>
                                                    </Card>
                                                  </CarouselItem>
                                                )
                                              )}
                                            </CarouselContent>
                                          </Carousel>
                                        </div>
                                      )}
                                    </div>
                                  </DrawerHeader>
                                  <DrawerFooter>
                                    <DrawerClose>
                                      <Button variant="outline">Back</Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </DrawerContent>
                              </Drawer>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : Array.from({ length: 10 }).map((_, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell className="font-medium">Not</TableCell>
                            <TableCell className="font-medium">Found</TableCell>
                            <TableCell>
                              <Button
                                disabled={true}
                                size={"icon"}
                                variant={"secondary"}>
                                <Info className="w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {creators && (
          <Pagination
            pageIndex={Number(page)}
            totalCount={creators.data.total}
            perPage={creators.data.count}
          />
        )}
      </Container>
    </Layout>
  );
}
