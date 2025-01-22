import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = searchParams.get("value") || undefined;

  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleChange = (data: string) => {
    setValue(data);
    setSearchParams((prev) => {
      if (data == "") {
        prev.delete("title");
      } else {
        prev.set("title", data);
      }

      return prev;
    });
  };

  return (
    <Input
      placeholder="Search..."
      height={"100%"}
      colorPalette={"blue"}
      mx={"1.5"}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
