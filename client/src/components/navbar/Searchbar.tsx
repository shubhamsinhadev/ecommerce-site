import { Input } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (value: string) => {
    if (value == "") {
      setSearchParams((prev) => {
        prev.delete("title");
        return prev;
      });
      return;
    }
    setSearchParams({ ...searchParams, title: value });
  };

  return (
    <Input
      placeholder="Search..."
      height={"100%"}
      colorPalette={"blue"}
      mx={"1.5"}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
