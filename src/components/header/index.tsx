import Image from "next/image";
import Container from "../container";
import NavItems from "./nav-items";

export default function Header() {
  return (
    <Container>
      <header className="flex mt-8 mb-10 justify-between items-center">
        <Image
          className="object-cover max-h-12"
          src="/marvel.png"
          height={48}
          width={120}
          alt="Marvel logo"
        />
        <NavItems />
      </header>
    </Container>
  );
}
