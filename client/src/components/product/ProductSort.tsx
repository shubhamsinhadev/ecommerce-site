import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { useState } from "react";
import { useSearchParams } from "react-router";

const ProductSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get("sort") || "popularity";

  const [value, setValue] = useState<string[]>([initialSort]);

  const handleChange = (value: string[]) => {
    if (value[0] === "popularity") {
      setSearchParams((prev) => {
        prev.delete("sort");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("sort", value[0]);
        return prev;
      });
    }

    setValue(value);
  };

  return (
    <SelectRoot
      variant={"outline"}
      value={value}
      onValueChange={(e) => handleChange(e.value)}
      size="md"
      width={"150px"}
      collection={sort}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {sort.items.map((i) => (
          <SelectItem item={i} key={i.value}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const sort = createListCollection({
  items: [
    { label: "Popularity", value: "popularity" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
});

export default ProductSort;
