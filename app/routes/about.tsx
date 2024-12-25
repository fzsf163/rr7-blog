import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { db } from "~/utils/db.server";
export async function loader({ request }: LoaderFunctionArgs) {
  const posts = await db.post.findMany();
  return { posts };
}

export default function About() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="h-fit w-full bg-slate-600 pb-10 pt-5 text-white sm:pt-24">
        <div
          className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start"
          style={{ fontFamily: "K2D" }}
        >
          <img
            src="potrait/woman-2604283_1280.jpg"
            className="w-[300px] rounded-md lg:w-[400px]"
            alt="potrait of author"
          />
          <div className="space-y-3 capitalize">
            <div>
              <h1 className="text-center text-3xl sm:text-left">
                Roksana Chowdhury
              </h1>
              <h2 className="text-center text-gray-300 sm:text-left">
                Creative author and director
              </h2>
            </div>
            <div className="space-y-5 text-center sm:text-left">
              {/* achievements */}
              <p className="w-[20rem]">
                Teacher turned software developer. JavaScript is my first love.
                Currently working on real-time data reporting with Scala, Kafka,
                and Kubernetes.
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
                  <img
                    src="social-svg/insta.svg"
                    alt=""
                    className="size-10"
                  />
                </div>
                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/pin.svg"
                    alt=""
                    className="size-10"
                  />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/snap.svg"
                    alt=""
                    className="size-10"
                  />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/tumbler.svg"
                    alt=""
                    className="size-10"
                  />
                </div>

                <div className="w-fit rounded-md bg-white/70 p-1 backdrop-blur-md">
                  <img
                    src="social-svg/x.svg"
                    alt=""
                    className="size-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[100rem] p-4 text-justify sm:text-start">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis totam a
        corporis, expedita error eaque fugit perspiciatis sit voluptatum
        reprehenderit, natus facilis! Necessitatibus autem eos expedita itaque
        voluptatem? Similique, excepturi. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Omnis totam a corporis, expedita error
        eaque fugit perspiciatis sit voluptatum reprehenderit, natus facilis!
        Necessitatibus autem eos expedita itaque voluptatem? Similique,
        excepturi.
      </div>
    </div>
  );
}
