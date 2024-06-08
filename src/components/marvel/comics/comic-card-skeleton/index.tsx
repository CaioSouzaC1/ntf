import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";

export default function ComicCardSkeleton() {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <Skeleton className="w-full h-4" />
      </CardHeader>
      <CardContent>
        <div className="relative aspect-w-16 aspect-h-14 overflow-hidden rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
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
