import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import FormHeader from "./input/dialog-header";
import { AvatarProfile } from "./ui/avatar";
import TextareaInput from "./input/textarea-input";
import ImageComponent from "./ui/image-preview";
import ImageInput from "./input/image-input";
import TweetButton from "./ui/tweet-button";
import { useGetTweetById } from "@/api/useGetTweetById";
import { ScrollArea } from "../ui/scroll-area";
import useReplyFormLogic from "./service/useReplyForm";
import useTweetFormLogic from "./service/useTweetForm";

export default function ReplyDialog({ isOpen, setIsOpen, id }: any) {
  const { formik, handleFileInputChange } = useTweetFormLogic({
    id,
    onSuccess() {
      setIsOpen(!isOpen);
    },
  });
  const { data } = useGetTweetById(id);

  const ref = useRef<HTMLTextAreaElement>(null);
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
    }
  }, [formik.isSubmitting]);

  const imageGridStyles: any = {
    1: "grid-rows-1",
    2: "grid grid-cols-2 grid-rows-1 gap-[2px]",
    3: "w-full h-80",
    4: "grid grid-cols-2 gap-[2px]",
  };
  const renderImages = () => {
    if (data?.images.length === 3) {
      return (
        <div className={`grid grid-cols-2 gap-[2px]`}>
          <div className="col-span-1">
            <img
              className={`h-80 w-full object-cover`}
              src={data?.images[0]?.url}
              alt={`Image 1`}
            />
          </div>
          <div className="col-span-1 grid grid-rows-2 h-full gap-[2px]">
            {data?.images.slice(1, 3).map((subImage: any, subIndex: any) => (
              <div key={subIndex} className="row-span-1">
                <img
                  className={` w-full object-cover h-[160px]`}
                  src={subImage?.url}
                  alt={`Image ${subIndex + 2}`}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-main-background flex border-0 p-2 top-[5%] max-h-[90%]">
        <ScrollArea className="max-h-full w-full ">
          <FormHeader onClose={() => setIsOpen(false)} />
          <article className="mx-4 flex flex-row h-auto">
            <div className="flex flex-col items-center gap-2 ">
              <div className="group relative self-start text-light-primary dark:text-dark-primary">
                <AvatarProfile />
              </div>
              <i className="hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply"></i>
            </div>

            <div className="flex flex-col w-full ml-4 justify-between">
              <div>
                <div className="flex gap-1 truncate xs:overflow-visible xs:whitespace-normal items-start">
                  <div className="flex items-center gap-1 truncate font-bold custom-underline text-light-primary dark:text-dark-primary">
                    username
                  </div>
                  <div className="truncate text-light-secondary dark:text-dark-secondary">
                    @staynaughty
                  </div>
                  <div className="flex gap-1">
                    <i>·</i>
                    <div className="group relative text-[#8f93a0]">
                      <div className="custom-underline peer whitespace-nowrap">
                        2h
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-1 text-light-primary dark:text-dark-primary ">
                  {data?.content}
                </div>

                {/* <div
                className={`items-center w-full mt-2 rounded-2xl overflow-hidden p-0 ${
                  imageGridStyles[data?.images?.length] || ""
                }`}
              >
                {renderImages()}
              </div> */}
              </div>

              <div className="text-light-secondary dark:text-dark-secondary">
                Replying to
                <a className="text-main-accent"> @staynaughty</a>
              </div>
            </div>
          </article>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-main-background flex flex-col justify-center items-center "
          >
            <label className="hover-animation grid w-full ">
              <div className="flex flex-row mx-4">
                <AvatarProfile />

                <div className="ml-4 w-full ">
                  <TextareaInput
                    ref={ref}
                    onInput={handleTextareaInput}
                    maxLength={500}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-1  p-2 pt-0 ">
                <div
                  className={`items-center w-full mt-2 grid pl-14 ${
                    formik.values.images.length > 1 ? "grid-cols-2" : ""
                  } gap-2`}
                >
                  {formik.values.images.map((image: any, index: any) => (
                    <ImageComponent
                      key={index}
                      image={image}
                      index={index}
                      imageLength={formik.values.images.length}
                      onDeleteImage={handleDeleteImage}
                    />
                  ))}
                </div>

                <div className="flex w-full justify-between mt-2">
                  <div className="flex items-center justify-center text-main-accent  ">
                    <ImageInput handleFileInputChange={handleFileInputChange} />
                  </div>
                  <TweetButton />
                </div>
              </div>
            </label>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
