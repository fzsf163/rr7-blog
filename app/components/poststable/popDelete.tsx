import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
} from "@nextui-org/react";
import { useFetcher } from "react-router";
import { DeleteIcon } from "./DeleteIcon";

export default function PopDelete({ postid }: { postid: string }) {
  const fetcher = useFetcher();
  return (
    <div>
      <Popover placement="right">
        <Tooltip color="danger" content="Delete post">
          <div>
            <PopoverTrigger>
              <div className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <DeleteIcon />
              </div>
            </PopoverTrigger>
          </div>
        </Tooltip>
        <PopoverContent>
          <div className="flex flex-col items-center justify-center gap-3 px-1 py-2">
            <p className="font-mono text-lg font-bold capitalize">
              Delete this Post?
            </p>
            <p className="font-sans text-sm font-semibold capitalize">
              To cancel click outside
            </p>
            <fetcher.Form
              method="post"
              action="/admin/dashboard"
              encType="application/x-www-form-urlencoded"
            >
              <Button
                variant="solid"
                color="danger"
                className="text-small font-bold"
                type="submit"
                name="delete"
                value={postid}
              >
                Yes
              </Button>
            </fetcher.Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
