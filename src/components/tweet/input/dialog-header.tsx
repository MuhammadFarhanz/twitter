import { CustomIcon } from "@/components/ui/custom-icon";
import { DialogClose } from "@/components/ui/dialog";

const FormHeader = ({ onClose }: any) => (
  <div className="h-10 flex flex-row justify-between">
    <DialogClose onClick={onClose}>
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
);

export default FormHeader;
