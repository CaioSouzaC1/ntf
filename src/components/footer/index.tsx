import Image from "next/image";
import Container from "../container";
import NavItems from "./nav-items";

export default function Footer() {
  return (
    <footer className="bg-secondary mt-8">
      <Container>
        <div className="py-2">
          <div className="flex my-8 flex-col">
            <div className="flex w-full justify-center">
              <Image
                className="object-cover max-h-28 rounded-b-sm"
                src="/marvel.png"
                height={112}
                width={220}
                alt="Marvel logo"
              />
            </div>
            <NavItems />
          </div>
        </div>
      </Container>
    </footer>
  );
}
