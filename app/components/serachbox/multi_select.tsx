import type { Selection } from "@heroui/react";
import { Button, Select, SelectItem } from "@heroui/react";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
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

  const handleFilterClear = () => {
    setSearchParams("");
  };

  const fadeInOutVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
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
        description="The best place to find peace of mind"
      >
        {categories.map((c) => (
          <SelectItem key={c.label}>{c.label}</SelectItem>
        ))}
      </Select>
      <AnimatePresence>
        {searchParams.get("categories") !== null && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInOutVariants}
            transition={{ duration: 0.5 }}
          >
            <Button
              radius="sm"
              variant="faded"
              className="flex items-center justify-start gap-1"
              type="button"
              onPress={handleFilterClear}
              key={"clearFilterButton"}
            >
              <p>Clear filter</p>
              <IconX stroke={3}></IconX>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
