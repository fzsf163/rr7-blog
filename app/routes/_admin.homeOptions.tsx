import { Tooltip } from "@heroui/react";
import { useEffect, useState } from "react";
import { data, Form } from "react-router";
import { toast } from "react-toastify";
import { CheckboxSection } from "~/components/HomeOptions/checkBoxComponent";
import type { LoaderDataProps } from "~/types/HomeOptionTypes";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import { ErrorHandler } from "~/utils/error_Handler";
import type { Route } from "./+types/_admin.homeOptions";

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
    const trending = await db.trendingBlogs.findMany();
    const allData: LoaderDataProps = {
      slider,
      featuredPosts,
      posts,
      trending,
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
  const idForSlider = await db.slider.findFirst({
    select: {
      id: true,
    },
  });

  const idForFeaturedBlogs = await db.featuredBlogs.findFirst({
    select: {
      id: true,
    },
  });

  const idForTrendingBlogs = await db.trendingBlogs.findFirst({
    select: {
      id: true,
    },
  });
  let hasUpdated = false;
  try {
    if (carousel.length > 0) {
      if (idForSlider) {
        // Update the existing record
        await db.slider.update({
          where: {
            id: idForSlider.id,
          },
          data: {
            contents: carousel.toString(),
          },
        });
      } else {
        // Create a new record
        await db.slider.create({
          data: {
            contents: carousel.toString(),
          },
        });
      }
    }
    if (featuredarticles.length > 0) {
      if (idForFeaturedBlogs) {
        // Update the existing record
        await db.featuredBlogs.update({
          where: {
            id: idForFeaturedBlogs.id,
          },
          data: {
            contents: featuredarticles.toString(),
          },
        });
      } else {
        // Create a new record
        await db.featuredBlogs.create({
          data: {
            contents: featuredarticles.toString(),
          },
        });
      }
      hasUpdated = true;
    }

    if (trendingblog.length > 0) {
      if (idForTrendingBlogs) {
        // Update the existing record
        await db.trendingBlogs.update({
          where: {
            id: idForTrendingBlogs.id,
          },
          data: {
            contents: trendingblog.toString(),
          },
        });
      } else {
        // Create a new record
        await db.trendingBlogs.create({
          data: {
            contents: trendingblog.toString(),
          },
        });
      }
      hasUpdated = true;
    }

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
    const herror = ErrorHandler.handleError(error);
    console.log("🚀 --------------------------🚀");
    console.error("🚀 ~ action ~ herror:", herror);
    console.log("🚀 --------------------------🚀");
    return data({
      status: 500,
      statustext: "An error occurred while processing the request.",
    });
  }
}

export default function HomeOptions({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { slider, posts, featuredPosts, trending } =
    loaderData as unknown as LoaderDataProps;

  // Transform data once
  const transformedData = {
    slider: slider.map((item) => ({
      ...item,
      contents: item.contents.split(","),
    })),
    featured: featuredPosts.map((item) => ({
      ...item,
      contents: item.contents.split(","),
    })),
    trending: trending.map((item) => ({
      ...item,
      contents: item.contents.split(","),
    })),
  };

  // State management
  const [carouselChecked, setCarouselChecked] = useState<
    Record<string, boolean>
  >({});
  const [featuredChecked, setFeaturedChecked] = useState<
    Record<string, boolean>
  >({});
  const [trendingChecked, setTrendingChecked] = useState<
    Record<string, boolean>
  >({});

  type StatusCode = 200 | 400 | 500;
  // Toast notifications
  useEffect(() => {
    if (!actionData) return;

    const notifyMap: {
      200: typeof toast.success;
      400: typeof toast.warn;
      500: typeof toast.error;
    } = {
      200: toast.success,
      400: toast.warn,
      500: toast.error,
    };
    if (actionData.status in notifyMap) {
      notifyMap[actionData.status as StatusCode]?.(actionData.statustext);
    } else {
      console.error(`Unexpected status code: ${actionData.status}`);
    }
  }, [actionData]);

  return (
    <Form method="POST" encType="application/x-www-form-urlencoded">
      <div className="mx-auto w-fit space-y-10 py-5 sm:w-[70%]">
        <h1 className="text-4xl font-bold">Home Settings</h1>
        {/* serialize the order list */}
        <div className="space-y-10">
          <CheckboxSection
            title="Carousel"
            subtitle="Select posts for carousel"
            name="carousel"
            posts={posts}
            checkedState={carouselChecked}
            setCheckedState={setCarouselChecked}
            selectedPosts={transformedData.slider[0]?.contents || []}
          />

          <CheckboxSection
            title="Featured Articles"
            subtitle="Select posts for featured"
            name="featuredarticles"
            posts={posts}
            checkedState={featuredChecked}
            setCheckedState={setFeaturedChecked}
            selectedPosts={transformedData.featured[0]?.contents || []}
          />

          <CheckboxSection
            title="Trending Blog"
            subtitle="Select posts for trending"
            name="trendingblog"
            posts={posts}
            checkedState={trendingChecked}
            setCheckedState={setTrendingChecked}
            selectedPosts={transformedData.trending[0]?.contents || []}
          />
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
