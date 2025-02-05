import { Card, CardBody, CardFooter, CardHeader, Spinner } from "@heroui/react";
import { IconDirectionSignFilled } from "@tabler/icons-react";
import { Link } from "react-router";
import { FeaturedArticleType } from "~/types/featured_article_type";
import "./featured-article.css";

interface FAPROPS {
  feat_art: FeaturedArticleType[];
}
export default function FeaturedArticle({ feat_art }: FAPROPS) {
  if (!feat_art)
    return (
      <div className="flex h-[20rem] w-full items-center justify-center">
        <Spinner color="success" label="Wait! 🥺 looking for posts" />
      </div>
    );
  return (
    <div className="text-center">
      <h1 className="fa-text text-xl font-bold uppercase sm:text-2xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl">
        Featured Article
      </h1>
      {/* cards */}
      <div className="inline-grid grid-cols-12 gap-3 p-3 sm:p-8 md:gap-8 lg:gap-20">
        {feat_art.map((article, index) => {
          return (
            <Card
              isFooterBlurred
              shadow="lg"
              className="col-span-12 m-auto h-fit w-fit max-w-[500px] rounded-2xl bg-transparent md:col-span-6 md:w-[300px] lg:w-[400px] xl:col-span-4 2xl:w-[600px]"
              key={index + article.id}
            >
              <CardHeader className="absolute top-0 z-10 flex-col items-start rounded-md rounded-bl-none rounded-br-none bg-black/70 dark:border dark:border-default-100 dark:bg-black/80">
                <p className="line-clamp-3 overflow-hidden text-ellipsis text-[10px] font-bold uppercase text-white sm:text-base">
                  {article.cardtitleOne}
                </p>
                <h4 className="line-clamp-3 overflow-hidden text-ellipsis pt-2 text-left text-base font-extralight capitalize text-foreground-100 sm:text-base">
                  {article.cardtitleTwo}
                </h4>
              </CardHeader>
              <CardBody
                className="h-[30rem] w-full p-0"
                style={{
                  backgroundImage: `url("${article.img}")`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></CardBody>
              <CardFooter className="absolute bottom-0 left-0 rounded-md rounded-tl-none rounded-tr-none bg-black/80 backdrop-blur-sm dark:border dark:border-default-100">
                <div className="flex flex-grow items-center gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white/60">
                      <IconDirectionSignFilled />
                    </span>
                    <p className="text-tiny capitalize text-white/60">
                      {article.cardfooter}
                    </p>
                  </div>
                </div>
                <Link to={`blog/${article.id}`} viewTransition>
                  <button className="cursor-pointer rounded-full bg-black/30 p-2 text-xs capitalize text-white backdrop-blur-lg dark:bg-white/40 lg:px-3 lg:text-lg">
                    read more
                  </button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
