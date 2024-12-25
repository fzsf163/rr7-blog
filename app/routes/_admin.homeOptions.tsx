/* eslint-disable import/no-unresolved */
import { Checkbox, Tooltip } from "@nextui-org/react";
import { IconSquareCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { data, Form } from "react-router";
import { toast } from "react-toastify";
import { LoaderDataProps } from "~/types/HomeOptionTypes";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import { Route } from "./+types/_admin.homeOptions";

export async function loader({ request }: Route.LoaderArgs) {
  await authenticate(request);
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
      },
    });
    const slider = await db.slider.findMany();
    const featuredPosts = await db.featuredBlogs.findMany();
    const allData: LoaderDataProps = {
      slider,
      featuredPosts,
      posts,
    };

    return data(allData);
  } catch (error) {
    return data({
      error: error as string,
    });
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formdata = await request.formData();
  const carousel = formdata.getAll("carousel");
  const featuredarticles = formdata.getAll("featuredarticles");
  const trendingblog = formdata.getAll("trendingblog");
  const authorShortDescription = formdata.get("authorShortDescription");
  const authorID = await authenticate(request);
  const idForSlider = await db.slider.findFirst();
  const idForFeaturedBlogs = await db.featuredBlogs.findFirst();
  let hasUpdated = false;
  try {
    if (carousel.length > 0) {
      await db.slider.upsert({
        where: { id: idForSlider?.id }, // Assuming you have a unique identifier for the slider
        update: {
          contents: carousel.toString() ?? undefined,
        },
        create: {
          contents: carousel.toString() ?? undefined,
        },
      });
      hasUpdated = true;
    }

    if (featuredarticles.length > 0) {
      await db.featuredBlogs.upsert({
        where: { id: idForFeaturedBlogs?.id }, // Assuming you have a unique identifier for the featured blogs
        update: {
          contents: featuredarticles.toString() ?? undefined,
        },
        create: {
          contents: featuredarticles.toString() ?? undefined,
        },
      });
      hasUpdated = true;
    }

    // if (trendingblog.length > 0) {
    //   await db.trendingBlogs.upsert({
    //     where: { id: 1 }, // Assuming you have a unique identifier for the trending blogs
    //     update: {
    //       contents: trendingblog.toString() ?? undefined,
    //     },
    //     create: {
    //       contents: trendingblog.toString() ?? undefined,
    //     },
    //   });
    // hasUpdated = true;
    // }

    if (authorShortDescription) {
      await db.user.update({
        where: {
          id: authorID,
        },
        data: {
          shortbio: String(authorShortDescription),
        },
      });
      hasUpdated = true;
    }

    if (hasUpdated) {
      return data({
        status: 200,
        statustext: "Success",
      });
    } else {
      return data({
        status: 400,
        statustext: "No data provided for update or creation.",
      });
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
    return data({
      status: 500,
      statustext: "An error occurred while processing the request.",
    });
  }
}

// icon for checkBox
const CheckIcon = ({ ...props }) => {
  // avoid passing non-DOM attributes to svg
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } =
    props;
  return <IconSquareCheck stroke={3} {...otherProps}></IconSquareCheck>;
};
const layerModel = [
  {
    label: "carousel",
    id: 1,
    sub: "Select posts for carousel",
  },
  {
    label: "featured articles",
    id: 2,
    sub: "Select posts for featured",
  },
  {
    label: "trending blog",
    id: 3,
    sub: "Select posts for trending",
  },
];

export default function HomeOptions({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  // Initialize separate state objects for each section
  const [carouselCheckedState, setCarouselCheckedState] = useState<
    Record<string, boolean>
  >({});
  const [featuredArticlesCheckedState, setFeaturedArticlesCheckedState] =
    useState<Record<string, boolean>>({});
  const [trendingBlogCheckedState, setTrendingBlogCheckedState] = useState<
    Record<string, boolean>
  >({});

  const { slider, posts, featuredPosts } =
    loaderData as unknown as LoaderDataProps;
  const transformedSlider = slider.map((item) => ({
    ...item,
    contents: item.contents.split(","),
  }));

  const transformedFeaturedBlogs = featuredPosts.map((item) => ({
    ...item,
    contents: item.contents.split(","),
  }));

  // Function to determine the initial checked state
  const getInitialCheckedState = (L: { label: string }, pId: string) => {
    return (
      (L.label.toLowerCase() === "carousel" &&
        transformedSlider[0]?.contents.includes(pId)) ||
      (L.label.toLowerCase() === "featured articles" &&
        transformedFeaturedBlogs[0]?.contents.includes(pId)) ||
      (L.label.toLowerCase() === "trending blog" &&
        transformedFeaturedBlogs[0]?.contents.includes(pId))
    );
  };

  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(text);
  const notifyWarn = (text: string) => toast.warn(text);
  useEffect(() => {
    if (actionData?.status === 200) {
      notify(actionData?.statustext);
    }
    if (actionData?.status === 400) {
      notifyWarn(actionData?.statustext);
    }
    if (actionData?.status === 500) {
      notifyError(actionData?.statustext);
    }
  }, [actionData]);
  return (
    <Form method="POST" encType="application/x-www-form-urlencoded">
      <div className="mx-auto w-fit space-y-10 py-5 sm:w-[70%]">
        <h1 className="text-4xl font-bold">Home Settings</h1>
        {/* serialize the order list */}
        <div className="space-y-10">
          {layerModel.map((L) => {
            return (
              <div key={L.id}>
                <p className="text-xl font-semibold capitalize">{L.label}</p>
                <p className="my-3 font-bold text-gray-500">{L.sub}</p>
                <div className="grid w-full gap-2 rounded bg-neutral-300 p-4 text-xl font-semibold shadow-md">
                  {posts.map((p) => {
                    const isChecked = getInitialCheckedState(L, p.id);
                    // Determine the appropriate state and setter based on the label
                    let checkedState: Record<string, boolean> = {};
                    let setCheckedState: React.Dispatch<
                      React.SetStateAction<Record<string, boolean>>
                    > = () => {};
                    if (L.label.toLowerCase() === "carousel") {
                      checkedState = carouselCheckedState;
                      setCheckedState = setCarouselCheckedState;
                    } else if (L.label.toLowerCase() === "featured articles") {
                      checkedState = featuredArticlesCheckedState;
                      setCheckedState = setFeaturedArticlesCheckedState;
                    } else if (L.label.toLowerCase() === "trending blog") {
                      checkedState = trendingBlogCheckedState;
                      setCheckedState = setTrendingBlogCheckedState;
                    }
                    return (
                      <Checkbox
                        key={p.id}
                        classNames={{
                          // base: "bg-green-600 m-5",
                          label: "flex flex-col",
                          // icon: "size-10",
                          wrapper: "bg-neutral-300 border-2 border-blue-900",
                        }}
                        icon={<CheckIcon></CheckIcon>}
                        size="lg"
                        radius="sm"
                        value={p.id}
                        name={L.label.split(" ").join("").toLowerCase()}
                        onChange={(x) => {
                          console.log("Checked:", x.currentTarget.checked);
                          console.log("Value:", x.currentTarget.value);
                        }}
                        isSelected={checkedState[p.id] ?? isChecked} // Set the checked state
                        onValueChange={(checked) => {
                          setCheckedState((prevState) => ({
                            ...prevState,
                            [p.id]: checked,
                          }));
                        }}
                      >
                        {p.title !== "" ? p.title : p.id}
                      </Checkbox>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-xl font-semibold capitalize">author section</p>
          <div className="my-3 flex flex-col items-start gap-2">
            <label
              className="font-bold text-gray-500"
              htmlFor="authorShortDescription"
            >
              Short Description For Home page
            </label>
            <textarea
              className="w-full rounded bg-neutral-300 px-3 py-5 text-xl font-semibold text-black placeholder:text-gray-500"
              placeholder="write a small description..."
              name="authorShortDescription"
              id="authorShortDescription"
              rows={5}
            />
          </div>
        </div>
        <br />
        <Tooltip content="Submit or Update Data">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </Tooltip>
      </div>
    </Form>
  );
}
