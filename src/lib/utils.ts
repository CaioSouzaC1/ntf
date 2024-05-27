import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class MarvelUtils {
  public static cutDescription(
    description: string,
    limit: number = 50
  ): string {
    return description.length > limit
      ? description.slice(0, limit).concat("...")
      : description;
  }

  public static multiplyPageToOffset(page: string) {
    return (Number(page) - 1) * 20;
  }
}

export function handlePaginate(
  pageIndex: number,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) {
  const params = new URLSearchParams(
    searchParams as unknown as URLSearchParams
  );

  if (pageIndex !== null) {
    params.set("page", pageIndex.toString());
  } else {
    params.delete("page");
  }

  router.push(`?${params.toString()}`);
}
