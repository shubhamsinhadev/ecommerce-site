import { createListCollection, Heading } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function CategoryFilter() {
  const [value, setValue] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (data: string[]) => {
    setSearchParams({ ...searchParams, category: data });
    setValue(data);
  };

  return (
    <SelectRoot
      variant={"outline"}
      multiple
      collection={category}
      mt={10}
      value={value}
      onValueChange={(e) => handleChange(e.value)}
    >
      <SelectLabel>
        <Heading size="xl">Category</Heading>
      </SelectLabel>
      <SelectTrigger clearable>
        <SelectValueText placeholder="Select categories" />
      </SelectTrigger>
      <SelectContent
        style={{
          zIndex: 1500, // ZIndex for Drawer is 1400
        }}
      >
        {category.items.map((i) => (
          <SelectItem item={i} key={i.value}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

const category = createListCollection({
  items: [
    { label: "Appliances", value: "appliances" },
    { label: "Audio", value: "audio" },
    { label: "Gaming", value: "gaming" },
    { label: "Laptop", value: "laptop" },
    { label: "Mobile", value: "mobile" },
    { label: "Television", value: "tv" },
  ],
});
