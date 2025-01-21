import {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { SelectRoot } from "../ui/select";

const ProductSort = () => {
  return (
    <SelectRoot variant={"outline"} size="sm" width={"150px"} collection={sort}>
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
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
});

export default ProductSort;
