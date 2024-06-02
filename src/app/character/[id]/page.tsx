"use client";
import Layout from "@/_layouts";
import { getCharacterById } from "@/app/api/marvel/character/get-character-by-id";
import { getCharacterComicsById } from "@/app/api/marvel/character/comics/get-character-comics-by-id";
import Container from "@/components/container";
import { ICharacterRoot } from "@/interfaces/marvel/character";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ICharacterComicsRoot } from "@/interfaces/marvel/character/comics";

export default function CharacterPage({ params }: { params: { id: string } }) {
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

        {isLoadingCharacter ? (
          <div>Loading</div>
        ) : (
          <>
            {character && (
              <div className="flex flex-wrap">
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md w-full lg:w-1/3">
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
                </div>
                <div className="w-full lg:w-2/3">
                  <div className="px-4">
                    {/* <p className="text-sm text-secondary-foreground">
                  {character.data.results[0].description}
                </p> */}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}
