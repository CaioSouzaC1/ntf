import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function EventCardNotFound() {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-center">
          NOTHING TO SEE HERE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md">
          <Image
            src={"/marvel_magneto.png"}
            alt={"NOTHING TO SEE HERE"}
            layout="fill"
            objectFit="cover"
            className=" hover:brightness-125 transition-all hover:scale-110"
          />
        </div>
        <div className="min-h-12 mt-4"></div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={true}
          variant={"secondary"}
          className="w-full flex gap-2">
          <span>See</span>
          <PlusCircle className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
