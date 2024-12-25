import { Button, Tab, Tabs } from "@nextui-org/react";
import { useEffect } from "react";
import { Form, useActionData } from "react-router";
import { toast } from "react-toastify";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/_admin.requestOptions";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await authenticate(request);
  try {
    const requestedTopics = await db.requestedTopics.findMany();
    const subscribers = await db.subscribers.findMany();
    return { requestedTopics, subscribers };
  } catch (error) {
    if (error) {
      return error;
    }
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formdata = await request.formData();
  const readStatus = formdata.get("readStatusChange");
  const id = formdata.get("id") as string;
  if (readStatus === "unread") {
    const rp = await db.requestedTopics.update({
      where: {
        id: id,
      },
      data: {
        readStatus: "read",
      },
      select: {
        id: true,
        readStatus: true,
      },
    });
    return rp;
  }
  if (readStatus === "read") {
    const rp = await db.requestedTopics.update({
      where: {
        id: id,
      },
      data: {
        readStatus: "unread",
      },
      select: {
        id: true,
        readStatus: true,
      },
    });
    return rp;
  }

  return { error: "Error Happened" };
};

type requestedProps = {
  id: string;
  requestedTopic: string;
  requesterName: string;
  requesterContact: string;
  time: string;
  readStatus: string;
}[];
type subscribersProps = {
  id: "b69e2f50-ef85-4a5d-8a2e-173ba3ccdb45";
  email: "test@myid.com";
  recieveEmail: true;
}[];

type actionProps = {
  id: string;
  readStatus: string;
  error: string;
};

// type key name must be same as what is being returned
type loaderdataProps = {
  requestedTopics: requestedProps;
  subscribers: subscribersProps;
};
// const tabs = [
//   { label: "requests", id: 1 },
//   { label: "subscribers", id: 2 },
// ];

export default function RequestOptions({ loaderData }: Route.ComponentProps) {
  const data_from_loader = loaderData as loaderdataProps;
  const requestedTopics = data_from_loader?.requestedTopics;
  const subscribers = data_from_loader?.subscribers;
  const actiondata = useActionData<typeof action>();

  const data = actiondata as actionProps;

  useEffect(() => {
    if (actiondata === undefined) return;
    if (data?.readStatus) {
      toast.success(`Status updated to ${data?.readStatus}`);
    }
    if (data?.error) {
      toast.error(data?.error);
    }
  }, [data, actiondata]);

  return (
    <div className="w-full py-5 sm:px-10">
      <Tabs aria-label="Request Posts" color="primary" size="lg" radius="sm">
        <Tab key={"requests"} title="Requests">
          <div className="mt-6">
            <h1 className="mx-2 w-fit text-4xl font-bold">Requests</h1>
            <div className="mt-5 grid w-fit grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 sm:w-full">
              {requestedTopics?.length === 0 && (
                <div>No Requested Topics yet</div>
              )}
              {requestedTopics?.map((rt) => {
                const {
                  id,
                  readStatus,
                  requestedTopic,
                  requesterContact,
                  requesterName,
                  time,
                } = rt;
                return (
                  <div
                    key={id}
                    className="w-full space-y-3 rounded-md bg-neutral-300 p-5 shadow-md"
                  >
                    <p className="text-xl">{requesterName}</p>
                    <div className="space-y-2">
                      <p className="text-medium text-gray-500">
                        {requesterContact}
                      </p>
                      <p className="text-wrap text-sm text-gray-400">{time} </p>
                    </div>
                    <p className="sm:text-2xl">{requestedTopic}</p>
                    <div className="flex items-center justify-end gap-2 py-3 font-medium">
                      <p className={"text-sm font-semibold"}>
                        {readStatus === "unread" ? "Unread" : "Read"}
                      </p>
                      <Form method="post">
                        <input
                          type="text"
                          name="id"
                          id="idofreq"
                          readOnly
                          value={id}
                          hidden
                        />
                        <Button
                          color={
                            readStatus === "unread" ? "primary" : "warning"
                          }
                          radius="sm"
                          name="readStatusChange"
                          type="submit"
                          value={readStatus}
                          size="sm"
                          className="text-white"
                        >
                          mark as {readStatus === "unread" ? "Read" : "Unread"}
                        </Button>
                      </Form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Tab>
        <Tab key={"subscribers"} title="Subscribers">
          <div className="mt-6">
            {" "}
            <h1 className="text-4xl font-bold">Subscribers</h1>
            {subscribers?.length === 0 && <div>No Subscribers Topics yet</div>}
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
              {subscribers?.map((s) => {
                const { email, recieveEmail, id } = s;
                return (
                  <div
                    key={id}
                    className="space-y-2 rounded bg-neutral-300 p-5 shadow-md"
                  >
                    <p className="text-xl">
                      Email: <span className="font-bold">{email}</span>
                    </p>
                    <p className="text-lg">
                      Send Blog News:{" "}
                      <span className="font-bold">
                        {recieveEmail === true ? "YES" : "NO"}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
