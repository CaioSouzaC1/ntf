import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICharactersResult } from "@/interfaces/marvel/characters";
import { MarvelUtils } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ICharacterCardProps {
  character: ICharactersResult;
}

export default function CharacterCard({ character }: ICharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-1">{character.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md">
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              layout="fill"
              objectFit="cover"
              className=" hover:brightness-125 transition-all hover:scale-110"
            />
          </div>
          <div className="min-h-12 mt-4">
            <CardDescription>
              {MarvelUtils.cutDescription(character.description, 60)}
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
