"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";
import { useIsBigScreen } from "@/components/header/nav-items";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AUTOPLAY_DELAY } from "@/lib/constants";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const plugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );
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
    {
      link: "/event/233",
      name: "Atlantis Attacks",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/9/60/51c9d7f42a0c8.jpg",
      category: "Event",
    },
    {
      link: "/event/32",
      name: "Kings of Pain",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/d/60/51c9e88b7fbd9.jpg",
      category: "Event",
    },
    {
      link: "/serie/32",
      name: "2020 Rescue (2020)",
      url: "http://i.annihil.us/u/prod/marvel/i/mg/1/40/5e558a8495066.jpg",
      category: "Serie",
    },
    {
      link: "/serie/16450",
      name: "A+X (2012 - 2014)",
      url: "page.tsx:45 http://i.annihil.us/u/prod/marvel/i/mg/5/d0/511e88a20ae34.jpg",
      category: "Serie",
    },
  ];

  gridLinks.sort(() => Math.random() - 0.5);

  const isBigScreen = useIsBigScreen();

  return (
    <Layout>
      <div className="w-full mx-auto rounded-md overflow-hidden -mt-4">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={750}
          baseHue={10}
          className="flex items-center flex-col justify-center px-2 md:px-10 w-full h-full gap-4">
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-16 lg:mt-32">
            What can I see on this site?
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl text-center">
            Everything that the marvel api offers, feel free to explore the
            pages.
          </p>
          <Container>
            {isBigScreen ? (
              <div className="grid grid-rows-2 grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
                <HomeGridCard cols="1" grid={gridLinks[0]} />
                <HomeGridCard cols="1" grid={gridLinks[1]} />
                <HomeGridCard cols="1" grid={gridLinks[2]} />
                <HomeGridCard cols="1" grid={gridLinks[3]} />
                <HomeGridCard cols="1" grid={gridLinks[4]} />
                <HomeGridCard cols="2" grid={gridLinks[5]} />
                <HomeGridCard cols="1" grid={gridLinks[6]} />
              </div>
            ) : (
              <Carousel
                className="my-8"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}>
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="px-8">
                      <HomeGridCard cols="1" grid={gridLinks[index]} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )}
          </Container>
        </Vortex>
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
        <Badge
          className="absolute top-3 right-3 text-sm"
          variant={"destructive"}>
          {grid.category}
        </Badge>
      </div>
      <div className="mt-4">
        <p className="font-bold text-center lg:text-left">{grid.name}</p>
      </div>
    </Link>
  );
};