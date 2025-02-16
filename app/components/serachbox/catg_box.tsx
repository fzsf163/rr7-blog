import { Button, Checkbox, CheckboxGroup } from "@heroui/react";
import { useState } from "react";

const categories = [
  { label: "Spirituality", bgImg: "categoriesimg/spirituality.jpg" },
  { label: "Relationship", bgImg: "categoriesimg/relationship.jpg" },
  { label: "Lifestyle", bgImg: "categoriesimg/lifestyle.jpg" },
  { label: "Mental Health", bgImg: "categoriesimg/mentalhealth.jpg" },
  { label: "Money", bgImg: "categoriesimg/money.jpg" },
  { label: "Health", bgImg: "categoriesimg/health.jpg" },
];
export default function CategoriesChecks() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="space-y-2 rounded p-3 shadow-md">
      <CheckboxGroup
        label="Select Categories (Select to filter)"
        orientation={"horizontal"}
        value={selected}
        onValueChange={setSelected}
      >
        {categories.map((c) => {
          return (
            <Checkbox key={c.label} value={c.label}>
              {c.label}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <Button type="button" color="primary" radius="sm">
        Filter
      </Button>
    </div>
  );
}
