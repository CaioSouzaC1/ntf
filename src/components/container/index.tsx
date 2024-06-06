import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="container px-4 lg:px-8">{children}</div>;
}
