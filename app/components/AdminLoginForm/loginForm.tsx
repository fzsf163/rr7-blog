import { IconMail, IconPassword } from "@tabler/icons-react";

export default function LoginForm() {
  return (
    <div
      className="m-auto flex w-[30rem] flex-col items-center justify-center gap-10 rounded-lg bg-black/10 p-10 backdrop-blur-sm "
      style={{ fontFamily: "K2D" }}
    >
      <h1 className="text-5xl font-bold capitalize text-white">Admin login</h1>
      <div className="group flex w-full items-center justify-center gap-3">
        <label
          htmlFor="emailAdmin"
          className="text-white transition-all duration-500 ease-in-out group-hover:text-green-500"
        >
          {" "}
          <IconMail stroke={2} className="size-12 drop-shadow-2xl" />
        </label>
        <input
          type="email"
          name="email"
          id="emailAdmin"
          required
          placeholder="email"
          className="w-full rounded-lg p-4 shadow-md shadow-white/40 outline-none transition-all duration-500 ease-in-out placeholder:font-bold focus-within:outline-2 focus-within:outline-green-500 focus:shadow-xl"
        />
      </div>
      <div className="group flex w-full items-center justify-center gap-3">
        <label
          htmlFor="passwordAdmin"
          className="text-white transition-all duration-500 ease-in-out group-hover:text-green-500"
        >
          <IconPassword stroke={2} className="size-12 drop-shadow-2xl" />
        </label>
        <input
          type="password"
          name="password"
          id="passwordAdmin"
          autoComplete="current-password"
          required
          placeholder="password"
          className="w-full rounded-lg p-4 shadow-md shadow-white/40 outline-none transition-all duration-500 ease-in-out placeholder:font-bold focus-within:outline-2 focus-within:outline-green-500 focus:shadow-xl"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-white px-4 py-3 font-bold outline-none transition-all duration-300 ease-in-out hover:bg-slate-500 hover:text-white hover:outline-2 hover:outline-green-500 w-[10rem] h-[4rem]"
      >
        Sign In
      </button>
    </div>
  );
}
