import { db } from "~/utils/db.server";
import type { Route } from "./+types/about";
export async function loader() {
  const author = await db.user.findFirst({
    select: {
      authorblog: true,
      image: true,
      id: true,
      shortbio: true,
      title: true,
      name: true,
    },
  });
  return { author };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const author = loaderData.author;
  return (
    <div>
      <div className="h-fit w-full bg-slate-600 pb-10 pt-5 text-white sm:pt-24">
        <div
          className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start"
          style={{ fontFamily: "K2D" }}
        >
          <img
            src={
              author?.image ? author.image : "potrait/woman-2604283_1280.jpg"
            }
            className="w-[300px] rounded-md lg:w-[400px]"
            alt="potrait of author"
          />
          <div className="space-y-3 capitalize">
            <div>
              <h1 className="text-center text-3xl sm:text-left">
                {author?.name ? author.name : "Roksana Chowdhury"}
              </h1>
              <h2 className="text-center text-gray-300 sm:text-left">
                {author?.title ? author.title : "Creative author and director"}
              </h2>
            </div>
            <div className="space-y-5 text-center sm:text-left">
              {/* achievements */}
              <p className="w-[20rem]">
                {author?.shortbio
                  ? author.shortbio
                  : "Shortbio used to be here"}
              </p>
              {/* socials */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/facebook.svg"
                    alt=""
                    className="size-10"
                  />
                </div>
                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img src="social-svg/insta.svg" alt="" className="size-10" />
                </div>
                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img src="social-svg/pin.svg" alt="" className="size-10" />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img src="social-svg/snap.svg" alt="" className="size-10" />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/tumbler.svg"
                    alt=""
                    className="size-10"
                  />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img src="social-svg/x.svg" alt="" className="size-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[100rem] p-4 text-justify sm:text-start min-h-screen">
        {author?.authorblog ? author.authorblog : "SOmething author wrote"}
      </div>
    </div>
  );
}
