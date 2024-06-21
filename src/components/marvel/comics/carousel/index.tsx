import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
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
import Image from "next/image";
import { MarvelUtils } from "@/lib/utils";
import Link from "next/link";
import { Info, X } from "lucide-react";
import { IComicsRoot } from "@/interfaces/marvel/comics";
import { AUTOPLAY_DELAY } from "@/lib/constants";

interface ComicsCarouselProps {
  comics: IComicsRoot;
}

export default function ComicsCarousel({ comics }: ComicsCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {comics.data.results.map((comic, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
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
                        <DrawerTitle>{comic.title}</DrawerTitle>
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
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
                              <span>See comic internal page</span>
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
  );
}
