import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import FormHeader from "./input/dialog-header";
import { AvatarProfile } from "./ui/avatar";
import TextareaInput from "./input/textarea-input";
import ImageComponent from "./ui/image-preview";
import ImageInput from "./input/image-input";
import TweetButton from "./ui/tweet-button";
import { useGetTweetById } from "@/lib/hooks/useGetTweetById";
import { ScrollArea } from "../ui/scroll-area";
import useTweetFormLogic from "./utils/useTweetForm";
import { formatTimeAgo } from "./utils/formatTime";
import { useGetUser } from "@/lib/hooks/useGetUser";
import { CustomIcon } from "../ui/custom-icon";

interface ReplyDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

export default function ReplyDialog({
  isOpen,
  setIsOpen,
  id,
}: ReplyDialogProps) {
  const { formik, handleFileInputChange } = useTweetFormLogic({
    id,
    onSuccess() {
      setIsOpen(!isOpen);
    },
  });
  const { data } = useGetTweetById(id);
  const { data: user } = useGetUser();

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-main-background flex border-0 p-2 bg top-0 sm:top-[5%] sm:h-auto h-screen max-h-full sm:max-h-[90%]">
        <ScrollArea className="max-h-full w-full ">
          <FormHeader onClose={() => setIsOpen(false)} />
          <article className="mx-4 flex flex-row h-auto">
            <div className="flex flex-col items-center gap-2 ">
              <div className="group relative self-start text-light-primary dark:text-dark-primary">
                <AvatarProfile src={data?.author?.profile_pic} />
              </div>
              <i className="hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply"></i>
            </div>

            <div className="flex flex-col w-full ml-4 justify-between">
              <div>
                <div className="flex gap-1 truncate xs:overflow-visible xs:whitespace-normal items-start">
                  <div className="flex items-center gap-1 truncate font-bold custom-underline text-light-primary dark:text-dark-primary">
                    {data?.author?.name}
                    {data?.author?.is_verified && (
                      <CustomIcon
                        iconName="CheckmarkIcon"
                        className="fill-blue-400 h-5"
                      />
                    )}
                  </div>
                  <div className="truncate text-light-secondary dark:text-dark-secondary">
                    @{data?.author?.username}
                  </div>
                  <div className="flex gap-1">
                    <i>·</i>
                    <div className="group relative text-[#8f93a0]">
                      <div className="custom-underline peer whitespace-nowrap">
                        {formatTimeAgo(data?.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-1 text-light-primary dark:text-dark-primary break-words inline-block">
                  {data?.content}
                </div>
              </div>

              <div className="text-light-secondary dark:text-dark-secondary pt-3">
                Replying to
                <a className="text-main-accent"> @{data?.author?.username}</a>
              </div>
            </div>
          </article>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-main-background flex flex-col justify-center items-center "
          >
            <label className="hover-animation grid w-full ">
              <div className="flex flex-row mx-4 mt-4">
                <AvatarProfile src={user?.profile_pic} />

                <div className="ml-4 w-full ">
                  <TextareaInput
                    ref={ref}
                    onInput={handleTextareaInput}
                    maxLength={500}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    placeholder={"Post your reply"}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-1  p-2 pt-0 ">
                <div
                  className={`items-center w-full mt-2 grid pl-14 ${
                    formik.values.images.length > 1 ? "grid-cols-2" : ""
                  } gap-2`}
                >
                  {formik.values.images.map((image: any, index: number) => (
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
                  <div className="flex items-center justify-center text-main-accent px-2 ">
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
