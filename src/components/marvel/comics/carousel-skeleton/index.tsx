import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AUTOPLAY_DELAY } from "@/lib/constants";

export default function ComicsCarouselSkeleton() {
  const plugin = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
            <div className="p-1">
              <Card>
                <CardHeader className="pb-0">
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-full h-3" />
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <Skeleton className="w-full h-56" />
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
