"use client";
import Layout from "@/_layouts";

import Container from "@/components/container";
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
import { getEventById } from "@/app/api/marvel/event/get-event-by-id";
import { IEventRoot } from "@/interfaces/marvel/event";

export default function EventPage({ params }: { params: { id: string } }) {
  const {
    data: event,
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
  } = useQuery<IEventRoot>({
    queryKey: ["get-event"],
    queryFn: () => getEventById({ id: params.id }),
  });

  if (isErrorEvent) {
    return <NotFound title="event" />;
  }

  console.log(event);

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingEvent ? (
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
                  <div className="col-span-2 flex flex-col justify-between"></div>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}
