import { Input } from "@nextui-org/react";
import "./subscribe.css";
import { IconMailFilled } from "@tabler/icons-react";
import { Form } from "react-router";
export default function SubscribeBox() {
  return (
    <div className="m-auto space-y-4 rounded-lg bg-slate-400/30 py-12 text-center xl:max-w-[90%]">
      <h1 className="get-notified fa-text text-sm font-extrabold capitalize sm:text-5xl xl:text-6xl">
        Get notified with new articles
      </h1>
      <Form method="post">
        <div className="m-auto flex w-fit flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="group flex items-center justify-center rounded-md bg-[#6894b1]">
            <IconMailFilled className="pl-2 text-[#93b4ca] transition-all duration-250 ease-in-out group-focus-within:w-[0px] group-focus-within:pl-0 sm:h-[80px] sm:w-[50px]" />
            <input
              placeholder="your@email.com"
              className="input placeholder:text-sm placeholder:text-white/30 sm:h-[80px] sm:w-[400px] sm:placeholder:text-xl"
              name="emailHomePageSub"
              type="email"
              required
            />
          </div>
          <button className="buttonSub sm:h-[80px] sm:w-[200px]" type="submit">
            Subscribe
          </button>
        </div>
      </Form>
    </div>
  );
}
