import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { IconSearch } from "@tabler/icons-react";
import { Link, useFetcher } from "react-router";
import { PostData } from "~/types/post_data_type";

export default function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetcher = useFetcher();

  const posts: PostData[] = fetcher.data;

  return (
    <>
      <Button color="default" onPress={onOpen} isIconOnly radius="full">
        <IconSearch stroke={2} />
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: " bg-background dark:bg-background text-[#a8b0d3]",
          header: "",
          footer: "",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search For blogs
                <div>
                  <fetcher.Form
                    method="get"
                    action="/api/search"
                    encType="multipart/form-data"
                  >
                    <Input
                      classNames={{
                        inputWrapper: "bg-transparent shadow",
                      }}
                      placeholder="Search a title"
                      type="text"
                      isClearable
                      radius="sm"
                      startContent={<IconSearch stroke={2} />}
                      onChange={(event) => {
                        fetcher.submit(event.currentTarget.form);
                      }}
                      name="blogSearch"
                    />
                  </fetcher.Form>
                </div>
              </ModalHeader>
              <ModalBody>
                <div>
                  {fetcher.state === "loading" ? (
                    <Spinner label="looking for blogs..."></Spinner>
                  ) : (
                    <div className="space-y-2">
                      <p>Search results: {posts?.length ? posts?.length : 0}</p>
                      <div className="flex flex-col gap-2">
                        {posts?.map((p) => {
                          return (
                            <div key={p.id}>
                              <Card className="py-4">
                                <CardHeader className="flex-col items-start gap-2 px-4 pb-0 pt-2">
                                  <p className="text-balance font-bold uppercase">
                                    {p.title}
                                  </p>
                                  <small className="text-default-500">
                                    {p.synopsis}
                                  </small>
                                  <small className="text-xs font-bold">
                                    {p.tags}
                                  </small>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                  <Image
                                    alt="Card background"
                                    className="aspect-video rounded-xl object-cover"
                                    src={p.thumbnail}
                                  />
                                </CardBody>
                                <CardFooter>
                                  <Link
                                    to={`/blog/${p.id}`}
                                    className="text-blue-500"
                                  >
                                    See Blog
                                  </Link>
                                </CardFooter>
                              </Card>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#6f4ef2] text-foreground-100 shadow-lg shadow-indigo-500/20 dark:text-foreground-700"
                  onPress={onClose}
                  type="button"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
