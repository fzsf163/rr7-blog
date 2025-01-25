import { Button, Select, SelectItem } from "@heroui/react";

const categories = [
  { label: "Spirituality", bgImg: "categoriesimg/spirituality.jpg" },
  { label: "Relationship", bgImg: "categoriesimg/relationship.jpg" },
  { label: "Lifestyle", bgImg: "categoriesimg/lifestyle.jpg" },
  { label: "Mental Health", bgImg: "categoriesimg/mentalhealth.jpg" },
  { label: "Money", bgImg: "categoriesimg/money.jpg" },
  { label: "Health", bgImg: "categoriesimg/health.jpg" },
];

export default function SelectGroup() {
  return (
    <div>
      <Select
        className="max-w-xs"
        label="Favorite Category"
        placeholder="Select one or multiple categories"
        selectionMode="multiple"
      >
        {categories.map((c) => (
          <SelectItem key={c.label}>{c.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
