import Image from "next/image";
import Container from "../container";
import NavItems from "./nav-items";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary mt-8">
      <div className="bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Link
                href={
                  "https://www.marvel.com/insider?cid=dcom_promomodule_020200501_insider_characterpageoverview"
                }>
                <Image
                  alt="Marvel Insider Banner"
                  width={600}
                  height={600}
                  layout={"fluid"}
                  src={"/marvel_insider_banner.jpg"}
                  className="w-full object-cover hover:brightness-110 cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 py-6">
              <p className="text-destructive uppercase font-medium">
                Marvel Insider
              </p>
              <p className="text-white text-2xl font-black">
                Watch, Earn, Redeem!
              </p>
              <p className="text-white text-sm font-light">
                Get rewarded for doind what you alread do as a fan.{" "}
              </p>
              <Link
                href={
                  "https://www.marvel.com/insider?cid=dcom_promomodule_020200501_insider_characterpageoverview"
                }>
                <Button variant={"destructive"} className="uppercase font-bold">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-2">
          <div className="flex my-8 flex-col">
            <div className="flex w-full justify-center">
              <Link href={"/"}>
                <Image
                  className="object-cover max-h-28 rounded-b-sm cursor-pointer"
                  src="/marvel.png"
                  height={112}
                  width={220}
                  alt="Marvel logo"
                />
              </Link>
            </div>
            <NavItems />
          </div>
        </div>
      </Container>
    </footer>
  );
}
