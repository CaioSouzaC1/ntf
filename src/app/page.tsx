"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { SparklesCore } from "@/components/ui/sparkles";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
import Link from "next/link";

interface IGridLinks {
  link: string;
  name: string;
  url: string;
  category: string;
}

interface HomeGridCardProps {
  grid: IGridLinks;
  cols: string;
}

export default function Home() {
  const gridLinks = [
    {
      link: "/character/1017297",
      name: "Wolverine",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/6/00/5239c3b29cb40.jpg",
      category: "Character",
    },
    {
      link: "/character/1009608",
      name: "Spider-Woman",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/b/50/5265479097743.jpg",
      category: "Character",
    },
    {
      link: "/character/1009355",
      name: "Hulkling",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/8/20/4c003ed070fa0.jpg",
      category: "Character",
    },
    {
      link: "/character/1017574",
      name: "Angela (Aldrif Odinsdottir)",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/7/00/545a82f59dd73.jpg",
      category: "Character",
    },
    {
      link: "/character/1009171",
      name: "Bastion",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/d/80/52695253215f4.jpg",
      category: "Character",
    },
    {
      link: "/character/1009220",
      name: "Captain America",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg",
      category: "Character",
    },
    {
      link: "/character/1009722",
      name: "X-23",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/50fec5ed6f3de.jpg",
      category: "Character",
    },
    {
      link: "/comic/6181",
      name: "Ultimate Spider-Man Ultimate",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/6/c0/59079911f0fdb.jpg",
      category: "Comic",
    },
    {
      link: "/comic/78701",
      name: "Nebula (2020) #3",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/6/e0/5e86538d453bc.jpg",
      category: "Comic",
    },
    {
      link: "/comic/112881",
      name: "SPIDER-GWEN: SMASH TPB",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/b/03/664f71528712c.jpg",
      category: "Comic",
    },
    {
      link: "/event/314",
      name: "Age of Ultron",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/c/10/51ca0fc4c83c8.jpg",
      category: "Event",
    },
  ];

  gridLinks.sort(() => Math.random() - 0.5);

  return (
    <Layout>
      <div className="w-full mx-auto rounded-md overflow-hidden">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={1000}
          baseHue={10}
          className="flex items-center flex-col justify-center px-2 md:px-10 w-full h-full">
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-40">
            What can I see on this site?
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Everything that the marvel api offers, feel free to explore the
            pages.
          </p>
          <Container>
            <div className="grid grid-rows-2 grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
              <HomeGridCard cols="1" grid={gridLinks[0]} />
              <HomeGridCard cols="1" grid={gridLinks[1]} />
              <HomeGridCard cols="1" grid={gridLinks[2]} />
              <HomeGridCard cols="1" grid={gridLinks[3]} />
              <HomeGridCard cols="1" grid={gridLinks[4]} />
              <HomeGridCard cols="2" grid={gridLinks[5]} />
              <HomeGridCard cols="1" grid={gridLinks[6]} />
            </div>
          </Container>
        </Vortex>
      </div>

      <div className="h-96 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-3xl text-xl lg:text-5xl font-bold text-center text-white relative z-20 w-full">
          that was a bit of marvel history
        </h1>
        <div className="w-full h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-destructive to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-destructive to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-destructive to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-destructive to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.6}
            particleDensity={3000}
            className="w-full h-full"
            particleColor="#f01414e6"
          />

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(650px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </Layout>
  );
}

const HomeGridCard = ({ grid, cols }: HomeGridCardProps) => {
  return (
    <Link className={`lg:col-span-${cols}`} href={grid.link}>
      <div className="relative h-60 overflow-hidden rounded-sm lg:col-span-2">
        <Image
          src={grid.url}
          alt={grid.name}
          layout="fill"
          objectFit="cover"
          className=" hover:brightness-125 transition-all hover:scale-110"
        />
      </div>
      <div className="mt-4">
        <p className="font-bold">{grid.name}</p>
      </div>
    </Link>
  );
};