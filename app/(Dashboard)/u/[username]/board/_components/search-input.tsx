"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const {user} = useUser();
  useEffect(() => {
    const url = qs.stringifyUrl({
      url: `/u/${user?.username}/board/`,
      query: {
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull: true });
  
    router.push(url);
  }, [debouncedValue, router, user]);
  

  return (
    <div className="w-full relative">
      <Search
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
      />
      <input
        className="input input-bordered input-info"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};