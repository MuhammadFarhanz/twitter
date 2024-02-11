import { useEffect, useRef } from "react";
import { AvatarProfile } from "../tweet/ui/avatar";
import TextareaInput from "../tweet/input/textarea-input";
import ImageComponent from "../tweet/ui/image-preview";
import ImageInput from "../tweet/input/image-input";
import TweetButton from "../tweet/ui/tweet-button";

interface TweetFormProps {
  formik: any;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TweetFormFeed = ({
  formik,
  handleFileInputChange,
}: TweetFormProps) => {
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
    <form
      onSubmit={formik.handleSubmit}
      className="bg-main-background flex flex-col"
    >
      <label className="hover-animation grid w-full gap-3 px-4 py-3 grid-cols-[auto,1fr] border-b border-light-border dark:border-dark-border">
        <AvatarProfile />

        <div className="flex w-full flex-col mt-1 ">
          <TextareaInput
            ref={ref}
            onInput={handleTextareaInput}
            maxLength={500}
            value={formik.values.content}
            onChange={formik.handleChange}
          />

          <div
            className={`items-center w-full grid mt-2 ${
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

          <div className="flex justify-between">
            <div className="flex items-center justify-center text-main-accent ">
              <ImageInput handleFileInputChange={handleFileInputChange} />
            </div>
            <TweetButton />
          </div>
        </div>
      </label>
    </form>
  );
};
