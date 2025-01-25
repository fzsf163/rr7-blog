import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import { useMemo, useState } from "react";

export const DropCategories = () => {
  const [selectedKeys, setSelectedKeys] = useState<
    Set<string | number> | "all"
  >(new Set(["spirituality"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(",").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <div>
      <input
        type="text"
        name="category"
        value={selectedValue}
        hidden
        readOnly
      />
      <Dropdown
        classNames={{
          content: "bg-neutral-500/20  backdrop-blur-sm",
        }}
      >
        <DropdownTrigger className="w-full rounded-small bg-neutral-300 text-lg font-semibold text-black">
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          classNames={{
            list: "w-full bg-neutral-300 rounded-small text-black/50",
            base: "w-[30rem]",
          }}
          aria-label="Categories options"
          variant="shadow"
          color="default"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="spirituality">Spirituality</DropdownItem>
          <DropdownItem key="money">Money</DropdownItem>
          <DropdownItem key="mental_health">Mental Health</DropdownItem>
          <DropdownItem key="realationship">Realationship</DropdownItem>
          <DropdownItem key="health">Health</DropdownItem>
          <DropdownItem key="lifestyle">Lifestyle</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
