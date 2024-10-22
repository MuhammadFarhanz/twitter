import { CustomIcon } from "@/components/ui/custom-icon";
import { DialogClose } from "@/components/ui/dialog";
import TweetButton from "../ui/tweet-button";
import useWindow from "@/lib/hooks/window-context";

const FormHeader = ({ onClose }: any) => {
  const { isMobile } = useWindow();
  return (
    <div className="h-10 mb-2 flex flex-row justify-between">
      <DialogClose onClick={onClose}>
        <div className="dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center">
          {isMobile ? (
            <CustomIcon
              iconName="BackIcon"
              className="w-5 h-5 fill-light-primary dark:fill-dark-primary"
            />
          ) : (
            <CustomIcon
              iconName="CloseIcon"
              className="w-6 h-6 fill-light-primary dark:fill-dark-primary"
            />
          )}
        </div>
      </DialogClose>

      <div className=" justify-between text-main-accent font-semibold flex items-center dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 cursor-pointer rounded-full ">
        <p className="mr-4">Draft</p>
      </div>
    </div>
  );
};

export default FormHeader;
