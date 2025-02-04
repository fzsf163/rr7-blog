import { Checkbox } from "@heroui/react";
import { IconSquareCheck } from "@tabler/icons-react";

interface CheckboxSectionProps {
  title: string;
  subtitle: string;
  name: string;
  posts: Array<{ id: string; title: string }>;
  checkedState: Record<string, boolean>;
  setCheckedState: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  selectedPosts: string[];
}
const CheckIcon = ({ ...props }) => {
  // avoid passing non-DOM attributes to svg
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } =
    props;
  return <IconSquareCheck stroke={3} {...otherProps}></IconSquareCheck>;
};
export const CheckboxSection = ({
  title,
  subtitle,
  name,
  posts,
  checkedState,
  setCheckedState,
  selectedPosts,
}: CheckboxSectionProps) => {
  const getInitialChecked = (postId: string) => selectedPosts.includes(postId);

  return (
    <div>
      <p className="text-xl font-semibold capitalize">{title}</p>
      <p className="my-3 font-bold text-gray-500">{subtitle}</p>
      <div className="grid w-full gap-2 rounded bg-neutral-300 p-4 text-xl font-semibold shadow-md">
        {posts.map((post) => (
          <Checkbox
            key={post.id}
            classNames={{
              wrapper: "bg-neutral-300 border-2 border-blue-900",
            }}
            icon={<CheckIcon />}
            size="lg"
            radius="sm"
            value={post.id}
            name={name}
            isSelected={checkedState[post.id] ?? getInitialChecked(post.id)}
            onValueChange={(checked) => {
              setCheckedState((prev) => ({ ...prev, [post.id]: checked }));
            }}
          >
            {post.title || post.id}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
