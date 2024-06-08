"use client";
import Layout from "@/_layouts";

import Container from "@/components/container";
import { IComicRoot } from "@/interfaces/marvel/comic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import NotFound from "@/components/not-found";
import { getComicById } from "@/app/api/marvel/comic/get-comic-by-id";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarvelUtils } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComicPage({ params }: { params: { id: string } }) {
  const {
    data: comic,
    isLoading: isLoadingComic,
    isError: isErrorComic,
  } = useQuery<IComicRoot>({
    queryKey: ["get-comic"],
    queryFn: () => getComicById({ id: params.id }),
  });

  if (isErrorComic) {
    return <NotFound title="comic" />;
  }

  console.log(comic);

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingComic ? (
            <>
              <div className="relative aspect-w-16 aspect-h-5 overflow-hidden rounded-md col-span-1 min-w-20">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="col-span-1 flex flex-col justify-between">
                <p className="font-bold text-base lg:text-4xl text-right">
                  <Skeleton className="w-full h-40" />
                </p>
                <Button
                  disabled={true}
                  variant={"destructive"}
                  className="w-full">
                  <DollarSign className="w-4" />
                  Prices
                </Button>
              </div>
              <div className="col-span-2 flex flex-col justify-between">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Id</TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-40" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Diamond code
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-40" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Format</TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-40" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Page Count</TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-40" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ean</TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-40" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
              </div>
            </>
          ) : (
            <>
              {comic && (
                <>
                  <div className="relative aspect-w-16 aspect-h-5 overflow-hidden rounded-md col-span-1 min-w-20">
                    <Image
                      src={`${comic.data.results[0].thumbnail.path}.${comic.data.results[0].thumbnail.extension}`}
                      alt={comic.data.results[0].title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all hover:scale-110"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-between">
                    <p className="font-bold text-base lg:text-4xl text-right">
                      {comic.data.results[0].title}
                    </p>
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button variant={"destructive"} className="w-full">
                          <DollarSign className="w-4" />
                          Prices
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Comic prices</DialogTitle>
                          <DialogDescription>
                            <p className="text-base">
                              <span className="font-bold"> Print price: </span>
                              USD {comic.data.results[0].prices[0].price}
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="col-span-2 flex flex-col justify-between">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Id</TableCell>
                          <TableCell className="text-right">
                            {MarvelUtils.notFoundVerification(
                              comic.data.results[0].id
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Diamond code
                          </TableCell>
                          <TableCell className="text-right">
                            {MarvelUtils.notFoundVerification(
                              comic.data.results[0].diamondCode
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Format</TableCell>
                          <TableCell className="text-right">
                            {MarvelUtils.notFoundVerification(
                              comic.data.results[0].format
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Page Count
                          </TableCell>
                          <TableCell className="text-right">
                            {MarvelUtils.notFoundVerification(
                              comic.data.results[0].pageCount
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Ean</TableCell>
                          <TableCell className="text-right">
                            {MarvelUtils.notFoundVerification(
                              comic.data.results[0].ean
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <p className="text-xs">
                      {comic.data.results[0].description}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}
