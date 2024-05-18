import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICharactersResult } from "@/interfaces/marvel/characters";
import Image from "next/image";
import Link from "next/link";

interface ICharacterCardProps {
  character: ICharactersResult;
}

export default function CharacterCard({ character }: ICharacterCardProps) {
  console.log(character);
  return (
    <Link href={`/character/${character.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{character.name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-[450px]">
            <AspectRatio ratio={16 / 9}>
              <Image
                width={100}
                height={100}
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
