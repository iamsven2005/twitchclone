import { redirect } from "next/navigation";
import { SearchResults } from "@/app/_components/Search/Search"; 

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
};

const SearchPage = ({
  searchParams,
}: SearchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }

  return ( 
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <SearchResults term={searchParams.term} />
    </div>
  );
};
 
export default SearchPage;