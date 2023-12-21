import React, { ChangeEvent, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CustomIcon } from "../ui/custom-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { svg } from "../home/main";
import { useFormik } from "formik";
import { useCreateTweet } from "@/api/useCreateTweet";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

function Tweetdialog() {
  const { mutateAsync: createTweet, isSuccess, status } = useCreateTweet();
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      content: "",
      images: [],
    },
    onSubmit: async (values: any, { resetForm }) => {
      console.log(values, "values when submitting yo");
      await createTweet(values);

      if (isSuccess) {
        resetForm();
        setOpen(!open);
      }
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImages = Array.from(files).filter(
        (file: any, index: number) =>
          index < 4 &&
          file.type.startsWith("image/") &&
          formik.values.images.length < 4
      );
      console.log(newImages, "real cuy");

      formik.setFieldValue("images", [...formik.values.images, ...newImages]);
    }
  };

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  console.log(formik.values.images, status, isSuccess);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="custom-button rounded-full p-3  main-tab accent-tab absolute right-4 -translate-y-[130px] bg-main-accent text-lg font-bold outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12">
          <CustomIcon className=" h-6 w-6 xl:hidden" iconName="FeatherIcon" />
          <p className="hidden xl:block">Tweet</p>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-main-background flex border-0 p-2 max-h-[90%]">
        <ScrollArea className="max-h-full w-full">
          <div className=" h-10 flex flex-row justify-between ">
            <DialogClose onClick={() => formik.resetForm()}>
              <div className="dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center">
                <CustomIcon
                  iconName="CloseIcon"
                  className="w-6 h-6 fill-light-primary dark:fill-dark-primary"
                />
              </div>
            </DialogClose>
            <div className="text-main-accent font-semibold w-20 flex items-center justify-center dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 cursor-pointer rounded-full ">
              <p>Draft</p>
            </div>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-main-background flex flex-col "
          >
            <label className="hover-animation grid w-full gap-3 px-2 py-3 ">
              <div className="flex flex-row ">
                <a className="blur-picture flex self-start mr-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </a>

                <div className="flex w-full flex-col mt-1 min-h-[134px] h-fit">
                  <Textarea
                    ref={ref}
                    rows={1}
                    onInput={handleInput}
                    maxLength={500}
                    className="border-0 overflow-hidden p-1 resize-none bg-transparent text-lg outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
                    placeholder="What's Happening?"
                    name="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                  ></Textarea>

                  <div
                    className={` items-center w-full mt-2 ${
                      formik.values.images.length > 1
                        ? "grid grid-cols-2 grid-rows-1 gap-2"
                        : "grid-rows-1"
                    }`}
                  >
                    {formik.values.images.map((image: any, index: any) => (
                      <div key={index} className={`w-full relative`}>
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="bg-light-primary/80 hover:bg-light-primary/50 cursor-pointer rounded-full w-7 h-7 absolute right-3 mt-3 flex items-center justify-center"
                        >
                          <CustomIcon
                            iconName="CloseIcon"
                            className="w-4 h-4 fill-light-primary dark:fill-dark-primary"
                          />
                        </div>
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className={`${
                            formik.values.images.length === 1 && index === 0
                              ? "h-92"
                              : formik.values.images.length === 2 && index < 2
                              ? "h-72"
                              : formik.values.images.length > 2
                              ? "h-36"
                              : ""
                          } p-1 rounded-3xl w-full object-cover`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-light-border dark:border-dark-border pt-3">
                <div className="flex items-center px-2 justify-center text-main-accent xs:[&>button:nth-child(n+6)]:hidden md:[&>button]:!block [&>button:nth-child(n+4)]:hidden">
                  {svg.map(({ ...data }, index) => (
                    <label className="flex items-center">
                      <input
                        className="hidden"
                        type="file"
                        accept="images/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={index !== 0 && true}
                        name="image"
                        //  onChange={(e) => handleFileChange(e)} // Add your file change handler
                      />
                      <CustomIcon
                        iconName={data.iconName as any}
                        className={`mr-3 h-5 w-5 fill-main-accent cursor-pointer ${
                          index !== 0 && "opacity-50"
                        }`}
                      />
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="cursor-pointer rounded-full custom-button main-tab accent-tab bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
                >
                  tweet
                </button>
              </div>
            </label>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default Tweetdialog;
