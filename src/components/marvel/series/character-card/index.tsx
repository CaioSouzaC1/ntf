import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ISeriesResult } from "@/interfaces/marvel/series";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ISerieCardProps {
  serie: ISeriesResult;
}

export default function SerieCard({ serie }: ISerieCardProps) {
  return (
    <Link href={`/serie/${serie.id}`}>
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-1">{serie.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md">
            <Image
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt={serie.title}
              layout="fill"
              objectFit="cover"
              className=" hover:brightness-125 transition-all hover:scale-110"
            />
          </div>
          <div className="min-h-12 mt-4">
            <CardDescription className="line-clamp-2">
              {serie.description}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"secondary"} className="w-full flex gap-2">
            <span>See</span>
            <PlusCircle className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
