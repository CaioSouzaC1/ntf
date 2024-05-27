import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavItems() {
  const items = [
    {
      label: "Terms of Use",
      link: "https://disneytermsofuse.com/spanish-latin-american/",
    },
    {
      label: "Privacy Police",
      link: "https://privacy.thewaltdisneycompany.com/es-es/politica-de-privacidad/",
    },
    {
      label: "Interested based ads",
      link: "https://preferences-mgr.truste.com/?type=disneycolor&affiliateId=115",
    },
    {
      label: "License Agreement",
      link: "https://www.marvel.com/corporate/license_tou",
    },
  ];

  return (
    <nav className="my-4">
      <ul className="w-full flex justify-center">
        {items.map((e) => (
          <li key={e.link}>
            <Link href={e.link}>
              <Button size={"sm"} variant={"link"}>
                {e.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
