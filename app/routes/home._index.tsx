import { Spinner } from "@nextui-org/react";
import { EmblaOptionsType } from "embla-carousel";
import { Suspense, useEffect } from "react";
import { Await, type MetaFunction } from "react-router";
import { toast } from "react-toastify";
import Categories from "~/components/catagories/categories";
import FeaturedArticle from "~/components/feature-article/feature-article";
import MeetAuthor from "~/components/meet-author/meet-author";
import MotivationalText from "~/components/motivation-text/motive";
import EmblaCarousel from "~/components/slider/carousel";
import Social from "~/components/social-counter/social";
import SubscribeBox from "~/components/subscribe/subscribe";
import TrendingPost from "~/components/trending-posts/trending-post";
import { Post, PostData } from "~/types/post_data_type";
import { convertPostDataToFeaturedArticleArray } from "~/utils/converte_to_ft_art";
import { convertPostDataToSliderPropsArray } from "~/utils/converte_to_slider_img";
import { db } from "~/utils/db.server";
import { ErrorHandler } from "~/utils/error_Handler";
import type { Route } from "./+types/home._index";
export const meta: MetaFunction = () => {
  return [
    { title: "RB-Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  try {
    const posts = await db.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            shortbio: true,
            title: true,
            image: true,
          },
        },
      },
    });
    return {
      status: 200,
      statusText: "Success",
      data: posts,
    };
  } catch (error) {
    const e = ErrorHandler.handleError(error);
    return {
      status: e.status,
      statusText: e.statusText,
    };
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formdata = await request.formData();
  const subs = formdata.get("emailHomePageSub");

  if (subs) {
    try {
      await db.subscribers.upsert({
        create: {
          email: subs as string,
          recieveEmail: true,
        },
        update: {
          email: subs as string,
          recieveEmail: true,
        },
        where: {
          email: subs as string,
        },
      });

      return { success: "Subscribtion added, Thank You!!😚" };
    } catch (error) {
      return {
        error:
          "Something wrong happended, Please try again later" + " " + error,
      };
    }
  }
  return null;
}

type actionProps = {
  success: string | null | undefined;
  error: string | null | undefined;
};
export default function Index({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const OPTIONS: EmblaOptionsType = { loop: true, containScroll: false };
  const subsUpdate = actionData as actionProps;
  const post: Post = {
    status: loaderData.status,
    statusText: "Success",
    data: loaderData.data as PostData[],
  };
  const sliderImages = convertPostDataToSliderPropsArray(post);
  const featArticle = convertPostDataToFeaturedArticleArray(post);
  useEffect(() => {
    if (actionData === undefined) return;
    if (subsUpdate?.success) {
      toast.success(subsUpdate.success);
    }
    if (subsUpdate?.error) {
      toast.error(subsUpdate.error);
    }
  }, [actionData, subsUpdate]);
  return (
    <div className="max-w-screen-3xl m-auto my-5 space-y-8">
      <Suspense fallback={<Spinner />}>
        <Await resolve={post}>
          {() => (
            <EmblaCarousel
              slides={sliderImages.images ?? []}
              options={OPTIONS}
            ></EmblaCarousel>
          )}
        </Await>
      </Suspense>
      <Social></Social>
      <MotivationalText></MotivationalText>
      <FeaturedArticle feat_art={featArticle}></FeaturedArticle>
      <MeetAuthor></MeetAuthor>
      <TrendingPost></TrendingPost>
      <Categories></Categories>
      <SubscribeBox></SubscribeBox>
    </div>
  );
}
