import { createListCollection, Flex, Heading } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

export default function CategoryFilter() {
  return (
    <Flex direction={"column"} mt={4} gap={2}>
      <SelectRoot multiple collection={categoryList} width="100%">
        <SelectLabel>
          <Heading size="xl">Category</Heading>
        </SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select categories" />
        </SelectTrigger>
        <SelectContent>
          {categoryList.items.map((i) => (
            <SelectItem item={i} key={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Flex>
  );
}

const categoryList = createListCollection({
  items: [
    { label: "Popularity", value: "appliances" },
    { label: "audio", value: "audio" },
    { label: "gaming", value: "gaming" },
    { label: "laptop", value: "laptop" },
    { label: "mobile", value: "mobile" },
    { label: "tv", value: "tv" },
  ],
});
