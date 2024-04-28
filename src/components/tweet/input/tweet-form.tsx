import { forwardRef, useRef } from "react";
import { AvatarProfile } from "../ui/avatar";
import TextareaInput from "./textarea-input";
import ImageComponent from "../ui/image-preview";
import ImageInput from "./image-input";
import { cn } from "@/lib/utils";
import TweetButton from "../ui/tweet-button";
import { useGetUser } from "@/lib/hooks/useGetUser";

interface TweetFormProps {
  formik: any;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (index: number) => void;
  className?: any;
}

export const TweetFormDialog = ({
  formik,
  handleFileInputChange,
  handleDeleteImage,
  className,
}: TweetFormProps) => {
  const { data: user } = useGetUser();

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-main-background flex flex-col"
      encType="multipart/form-data"
    >
      <label
        className={cn("hover-animation grid w-full gap-3 px-2 py-3", className)}
      >
        <div className="flex flex-row ">
          <AvatarProfile className="mr-1" src={user?.profile_pic} />

          <div className="flex w-full flex-col mt-1 min-h-[134px] h-fit">
            <TextareaInput
              ref={ref}
              onInput={handleTextareaInput}
              maxLength={500}
              value={formik.values.content}
              onChange={formik.handleChange}
              placeholder={"What is happening?!"}
            />

            <div
              className={`items-center w-full mt-2 grid${
                formik.values.images.length > 1 && " grid-cols-2"
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
          </div>
        </div>

        <div className="flex justify-between border-t border-light-border dark:border-dark-border pt-3">
          <ImageInput handleFileInputChange={handleFileInputChange} />
          <TweetButton
            disable={
              formik.values.content || formik.values.images.length != 0
                ? false
                : true
            }
          />
        </div>
      </label>
    </form>
  );
};
