import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavItems() {
  const items = [
    "Characters",
    "Comics",
    "Creators",
    "Events",
    "Series",
    "Stories",
  ];

  const [isBigScreen, setIsBigScreen] = useState(false);

  const pathName = window.location.pathname;
  useEffect(() => {
    const handleResize = () => setIsBigScreen(window.innerWidth > 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLinks = () => (
    <>
      <Link href="/">
        <Button
          className={`font-normal ${"/" === pathName && "mx-4"}`}
          variant={`${"/" === pathName ? "destructive" : "link"}`}>
          Home
        </Button>
      </Link>
      {items.map((item) => {
        const path = `/${item.toLowerCase()}`;
        return (
          <Link key={item} href={path}>
            <Button
              className={`font-normal ${path === pathName && "mx-4"}`}
              variant={`${path === pathName ? "destructive" : "link"}`}>
              {item}
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav>
      {isBigScreen ? (
        renderLinks()
      ) : (
        <Drawer direction="bottom">
          <DrawerTrigger>
            <Button variant="outline">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Where do you want to go?</DrawerTitle>
            </DrawerHeader>
            <div className="mb-8 flex flex-col gap-4">{renderLinks()}</div>
          </DrawerContent>
        </Drawer>
      )}
    </nav>
  );
}