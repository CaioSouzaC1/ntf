import Image from "next/image";
import Container from "../container";
import NavItems from "./nav-items";
import Link from "next/link";

export default function Header() {
  return (
    <Container>
      <header className="flex mt-8 mb-10 justify-between items-center">
        <Link href={"/"}>
          <Image
            className="object-cover max-h-14 rounded-b-sm"
            src="/marvel.png"
            height={56}
            width={120}
            alt="Marvel logo"
          />
        </Link>
        <NavItems />
      </header>
    </Container>
  );
}
