import type { ActionFunctionArgs, MetaFunction } from "react-router";
import { useActionData } from "react-router";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Categories from "~/components/catagories/categories";
import FeaturedArticle from "~/components/feature-article/feature-article";
import MeetAuthor from "~/components/meet-author/meet-author";
import MotivationalText from "~/components/motivation-text/motive";
import EmblaCarousel from "~/components/slider/carousel";
import Social from "~/components/social-counter/social";
import SubscribeBox from "~/components/subscribe/subscribe";
import TrendingPost from "~/components/trending-posts/trending-post";
import { db } from "~/utils/db.server";
export const meta: MetaFunction = () => {
  return [
    { title: "RB-Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const slider_images = [
  {
    img: "/slider-images/1.jpg",
    header: "Turn your mind into a knowledge machine",
    mainTag: "Sprituality",
    description:
      "Lettie Alexander brave name quickly happen opinion expression slipped minerals article shallow headed limited empty word finish because coast win foot nodded sky repeat serve local Lettie Alexander brave name quickly happen opinion expression slipped minerals article shallow headed limited empty word finish because coast win foot nodded sky repeat serve local",
  },
  {
    img: "/slider-images/2.jpg",
    header: "Write your tension down, and make solution",
    mainTag: "Faith",
    description:
      "Francisco Suttonegg jet doctor use charge function specific opportunity force easy column speed voice direct calm human object good forth worried circus seeing baby badly",
  },
  {
    img: "/slider-images/3.jpg",
    header: "Sit down ,calm your minde, make yourself better",
    mainTag: "Clamness",
    description:
      "Rosetta Petersas matter funny wheat real market company establish pencil send slowly feed conversation toy please require goes graph should enjoy machine home mysterious animal",
  },
  {
    img: "/slider-images/4.jpg",
    header: "A note to self, Betterment comes from paitence ",
    mainTag: "Meditation",
    description:
      "Timothy Jonesvillage operation saw stronger easily cry idea everyone rubber further tide silent airplane fur vowel tone push laugh thousand dance cast mind claws hour",
  },
  {
    img: "slider-images/5.jpg",
    header: "Bloom your mind in the womb of nature",
    mainTag: "Nature",
    description:
      "Mayme Bishopteacher door fog we certainly useful struggle larger blue gently walk sentence rocky most travel fresh summer managed mail dark depend ahead aloud refer",
  },
];

export async function action({ request }: ActionFunctionArgs) {
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
export default function Index() {
  const OPTIONS: EmblaOptionsType = { loop: true, containScroll: false };
  const actiondata = useActionData<typeof action>();
  const subsUpdate = actiondata as actionProps;
  useEffect(() => {
    if (actiondata === undefined) return;
    if (subsUpdate?.success) {
      toast.success(subsUpdate.success);
    }
    if (subsUpdate?.error) {
      toast.error(subsUpdate.error);
    }
  }, [actiondata, subsUpdate]);
  return (
    <div className="max-w-screen-3xl m-auto my-5 space-y-8">
      <EmblaCarousel slides={slider_images} options={OPTIONS}></EmblaCarousel>
      <Social></Social>
      <MotivationalText></MotivationalText>
      <FeaturedArticle></FeaturedArticle>
      <MeetAuthor></MeetAuthor>
      <TrendingPost></TrendingPost>
      <Categories></Categories>
      <SubscribeBox></SubscribeBox>
    </div>
  );
}
