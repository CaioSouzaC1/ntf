import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mainItems, mediumItems, minorItems } from "../constants";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  Twitter,
  YoutubeIcon,
} from "lucide-react";

export default function NavItems() {
  return (
    <div className="flex gap-4 my-4 flex-col">
      <div className="flex justify-center lg:justify-evenly gap-8 flex-col lg:flex-row">
        <nav>
          <ul className="w-full flex justify-center flex-col">
            {mainItems.map((e) => (
              <li className="text-center lg:text-left" key={e.link}>
                <Link href={e.link}>
                  <Button className="uppercase" size={"lg"} variant={"ghost"}>
                    {e.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <ul className="w-full flex justify-center flex-col">
            {mediumItems.map((e) => (
              <li className="text-center lg:text-left" key={e.link}>
                <Link href={e.link}>
                  <Button
                    className="uppercase"
                    size={"default"}
                    variant={"ghost"}>
                    {e.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col justify-around">
          <div className="flex gap-4 items-center justify-center lg:justify-start">
            <Image
              className="object-cover max-h-[26px]"
              src="/marvel_insider.png"
              height={26}
              width={60}
              alt="Marvel insider logo"
            />
            <div>
              <p className="font-bold uppercase text-white">Marvel Insider</p>
              <p className="font-light text-gray-400 text-xs">
                Get rewarded for Being a Marvel Fan
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center lg:justify-start">
            <Image
              className="object-cover max-h-[26px]"
              src="/marvel_unlimited.png"
              height={26}
              width={60}
              alt="Marvel insider logo"
            />
            <div>
              <p className="font-bold uppercase text-white">Marvel Unlimited</p>
              <p className="font-light text-gray-400 text-xs">
                Access Over 30,000+ Digital Comics
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:justify-start items-center">
          <p className="uppercase font-bold text-white">Follow Marvel</p>
          <div className="my-4 justify-center lg:justify-between gap-2 flex">
            <div>
              <Link href={"http://facebook.com/marvel"}>
                <Button variant={"ghost"} size={"icon"}>
                  <FacebookIcon />
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"http://instagram.com/marvel"}>
                <Button variant={"ghost"} size={"icon"}>
                  <InstagramIcon />
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"http://youtube.com/marvel"}>
                <Button variant={"ghost"} size={"icon"}>
                  <YoutubeIcon />
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"http://twitter.com/marvel"}>
                <Button variant={"ghost"} size={"icon"}>
                  <Twitter />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <ul className="w-full flex justify-center lg:justify-evenly flex-col lg:flex-row">
          {minorItems.map((e) => (
            <li className="text-center lg:text-left" key={e.link}>
              <Link href={e.link}>
                <Button size={"sm"} variant={"link"}>
                  {e.label}
                </Button>
              </Link>
            </li>
          ))}
          <li className="text-center lg:text-left">
            <Button disabled size={"sm"} variant={"link"}>
              &copy;2024 MARVEL
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
