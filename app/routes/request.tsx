import { IconAsterisk } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData } from "react-router";
import { toast } from "react-toastify";
import RequestForm from "~/components/request-inputs/request-form";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const name = formdata.get("name");
  const email = formdata.get("email");
  const details = formdata.get("requestDetails");
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  const TimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // utc = +0
  const zone = 0 - new Date().getTimezoneOffset() / 60;
  if (name && email && details) {
    try {
      await db.requestedTopics.create({
        data: {
          requesterName: String(name),
          requesterContact: String(email),
          requestedTopic: String(details),
          time: String(
            time + " " + date + " " + "GMT+" + zone + " " + TimeZoneName,
          ),
          readStatus: "unread",
        },
      });
      return { success: "Request has been posted" };
    } catch (error) {
      if (error) {
        return { error };
      }
    }
  }
};

type actiondataProps = {
  success: string;
  error: unknown;
};
export default function RouteComponent() {
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const data = actionData as unknown as actiondataProps;
    if (actionData === undefined) return;
    if (actionData) {
      toast.success(data.success);
      formRef.current?.reset();
    }
    if (data?.error !== undefined) {
      toast.error(data?.error as string);
    }
  }, [actionData]);
  return (
    <div className="m-auto mb-20 w-full max-w-[50rem] space-y-6 px-2 py-4">
      <div className="space-y-2">
        <h1
          style={{ fontFamily: "K2D" }}
          className="text-3xl font-semibold capitalize"
        >
          Let&apos;s make a request for blog
        </h1>{" "}
        <p className="flex items-start justify-start text-gray-400">
          <span>
            <IconAsterisk stroke={2} className="size-4" color="red" />
          </span>{" "}
          All of the data added here will not be disclosed
        </p>
      </div>
      {/* do not use navigate false */}
      <Form ref={formRef} method="post">
        <div>
          <RequestForm></RequestForm>
        </div>
        <button className="submit-button mt-5" type="submit">
          Submit
        </button>
        <button className="submit-button mx-6 mt-5" type="reset">
          Reset
        </button>
      </Form>
    </div>
  );
}
