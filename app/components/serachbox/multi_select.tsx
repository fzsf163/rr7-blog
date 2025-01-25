import type { Selection } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { useSearchParams } from "react-router";
const categories = [
  { label: "Spirituality", bgImg: "categoriesimg/spirituality.jpg" },
  { label: "Relationship", bgImg: "categoriesimg/relationship.jpg" },
  { label: "Lifestyle", bgImg: "categoriesimg/lifestyle.jpg" },
  { label: "Mental Health", bgImg: "categoriesimg/mentalhealth.jpg" },
  { label: "Money", bgImg: "categoriesimg/money.jpg" },
  { label: "Health", bgImg: "categoriesimg/health.jpg" },
];

export default function SelectGroup() {


  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected categories from URL
  const selectedCategories = searchParams.get("categories")?.split(",") || [];
  const selectedKeys = new Set(selectedCategories);

  // Update URL when selection changes
  const handleSelectionChange = (keys: Selection) => {
    const newCategories = Array.from(keys).join(",");
    // Preserve existing search params while updating categories
    const newParams = new URLSearchParams(searchParams);
    if (newCategories) {
      newParams.set("categories", newCategories);
    } else {
      newParams.delete("categories");
    }
    setSearchParams(newParams);
  };
  return (
    <div className="w-full">
      <Select
        className="max-w-xs"
        label="Favorite Category"
        placeholder="Select one or multiple categories"
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        selectedKeys={selectedKeys}
      >
        {categories.map((c) => (
          <SelectItem key={c.label}>{c.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
