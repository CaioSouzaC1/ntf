import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IComicsResult } from "@/interfaces/marvel/comics";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IComicCardProps {
  comic: IComicsResult;
}

export default function ComicCard({ comic }: IComicCardProps) {
  return (
    <Link href={`/comic/${comic.id}`}>
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-1">{comic.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md">
            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              layout="fill"
              objectFit="cover"
              className=" hover:brightness-125 transition-all hover:scale-110"
            />
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
