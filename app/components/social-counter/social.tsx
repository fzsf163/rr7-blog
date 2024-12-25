import "./socialcard.css";
import { IconHeartPlus } from "@tabler/icons-react";
const socials = [
  { logo: "/social-svg/facebook.svg", count: 4191423064, name: "fb" },
  { logo: "/social-svg/x.svg", count: 735660815, name: "x" },
  { logo: "/social-svg/insta.svg", count: 59536144, name: "insta" },
  { logo: "/social-svg/tumbler.svg", count: 87298644, name: "tumbler" },
  { logo: "/social-svg/pin.svg", count: 814761197, name: "pin" },
  { logo: "/social-svg/snap.svg", count: 23319583, name: "snap" },
];

export default function Social() {
  // format the number
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 2xl:gap-20">
      {socials.map((s, index) => {
        return (
          <div className="card" key={index}>
            <div className="first-content">
              <span>
                {" "}
                <div className="m-auto w-fit text-center space-y-2 lg:space-y-5 xl:space-y-7">
                  <div
                    className="svg-logo m-auto rounded-lg size-8 md:size-10 lg:size-14 2xl:size-20"
                    aria-label={s.name}
                  >
                    <img src={s.logo}></img>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatter.format(s.count)}
                  </div>
                </div>
              </span>
            </div>
            <div className="second-content">
              <span className="flex items-center justify-center">
                Follow <IconHeartPlus stroke={2} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
