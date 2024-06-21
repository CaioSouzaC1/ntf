"use client";

import Layout from "@/_layouts";
import { getSerieById } from "@/app/api/marvel/serie/get-serie-by-id";
import Container from "@/components/container";
import NotFound from "@/components/not-found";
import { ISerieRoot } from "@/interfaces/marvel/serie";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import { getSerieComicsById } from "@/app/api/marvel/serie/comics/get-serie-comics-by-id";
import ComicsCarousel from "@/components/marvel/comics/carousel";
import ComicsCarouselSkeleton from "@/components/marvel/comics/carousel-skeleton";

export default function SeriePage({ params }: { params: { id: string } }) {
  const {
    data: serie,
    isLoading: isLoadingSerie,
    isError: isErrorSerie,
  } = useQuery<ISerieRoot>({
    queryKey: ["get-serie"],
    queryFn: () => getSerieById({ id: params.id }),
  });

  const { data: serieComics, isLoading: isLoadingSerieComics } =
    useQuery<IComicsRoot>({
      queryKey: ["get-serie-comics"],
      queryFn: () => getSerieComicsById({ id: params.id }),
    });

  if (isErrorSerie) {
    return <NotFound title="serie" />;
  }

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isLoadingSerie ? (
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <>
              {serie && (
                <div className="col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{serie.data.results[0].title}</CardTitle>
                      <CardDescription>
                        {serie.data.results[0].rating}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md min-w-20 min-h-60">
                        <Image
                          src={`${serie.data.results[0].thumbnail.path}.${serie.data.results[0].thumbnail.extension}`}
                          alt={serie.data.results[0].title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-all hover:scale-110"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-destructive">
                      #{serie.data.results[0].id}
                    </CardFooter>
                  </Card>
                </div>
              )}
            </>
          )}

          {isLoadingSerieComics ? (
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
              {serieComics && serieComics.data.total > 0 && (
                <div className="col-span-2">
                  <CardHeader className="py-2">
                    <CardTitle className="w-full text-center text-2xl hover:text-destructive transition-all">
                      Comics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="px-4 lg:px-8">
                      <ComicsCarousel comics={serieComics} />
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
