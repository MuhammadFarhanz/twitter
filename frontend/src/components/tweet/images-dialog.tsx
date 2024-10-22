import { DialogContent } from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay } from "../ui/dialog";

interface ImageDialogProps {
  isOpen: boolean;
  setImageDialogOpen: React.Dispatch<React.SetStateAction<any>>;
  selectedImageId: any;
  images: { id: any; url: string }[];
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  setImageDialogOpen,
  selectedImageId,
  images,
}) => {
  const imageUrl = images?.find(
    (image: any) => image.id === selectedImageId
  )?.url;

  return (
    <Dialog open={isOpen} onOpenChange={setImageDialogOpen}>
      <DialogOverlay className="flex items-center justify-center">
        <DialogContent className="p-0 w-auto h-auto ">
          <img
            className="w-[800px]  sm:max-h-[90vh] rounded-xl"
            src={imageUrl}
            alt={`Selected Image`}
          />
          <a href={imageUrl} target="_blank" className="ml-2 text-dark-primary">
            Open original
          </a>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
export default ImageDialog;
