import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBaseSearchParams } from "@/interfaces/api";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

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
      params.set("page", "1");

      router.push(`${window.location.pathname}?${params.toString()}`);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, router, page, handleSetSearch]);

  return (
    <div className="flex items-center gap-4 my-4 relative">
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
      {searchTerm != "" && (
        <Button
          onClick={() => setSearchTerm("")}
          className="absolute top-0 right-0"
          variant={"destructive"}>
          <X className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default InputSearch;
