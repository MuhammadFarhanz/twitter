import React, { ChangeEvent, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CustomIcon } from "../ui/custom-icon";
import { ScrollArea } from "../ui/scroll-area";
import useTweetFormLogic from "./utils/useTweetForm";
import { TweetFormDialog } from "./input/tweet-form";
import FormHeader from "./input/dialog-header";

function Tweetdialog() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(!open);
  };

  const { formik, handleFileInputChange } = useTweetFormLogic({
    onSuccess: handleSuccess,
  });

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="custom-button rounded-full p-3 main-tab accent-tab absolute right-4 -translate-y-[130px] bg-main-accent text-lg font-bold outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12">
          <CustomIcon className=" h-6 w-6 xl:hidden" iconName="FeatherIcon" />
          <p
            className="hidden xl:block 
          text-white"
          >
            Tweet
          </p>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-main-background flex border-0 p-2 max-h-[100%] sm:h-auto h-screen top-0 sm:top-[5%]">
        <ScrollArea className="max-h-full w-full">
          <FormHeader onClose={() => formik.resetForm()} />
          <TweetFormDialog
            formik={formik}
            handleFileInputChange={handleFileInputChange}
            handleDeleteImage={handleDeleteImage}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default Tweetdialog;
