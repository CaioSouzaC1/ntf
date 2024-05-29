import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBaseSearchParams } from "@/interfaces/api";
import { Search } from "lucide-react";

const InputSearch = ({
  placeholder,
  page,
  handleSetSearch,
}: IBaseSearchParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSetSearch(searchTerm);

      const params = new URLSearchParams(window.location.search);
      params.set("search", searchTerm);
      if (!searchTerm) params.delete("search");
      params.set("page", page.toString());

      router.push(`${window.location.pathname}?${params.toString()}`);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, router, page, handleSetSearch]);

  return (
    <div className="flex items-center gap-4 my-4">
      <Label htmlFor="search" className="flex text-lg gap-2">
        <Search />
        <span>Search</span>
      </Label>
      <Input
        placeholder={placeholder}
        id="search"
        className="hover:border-destructive"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;
