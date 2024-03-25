import { CustomIcon } from "@/components/ui/custom-icon";
import React from "react";

function ImageComponent({ image, index, onDeleteImage, imageLength }: any) {
  return (
    <div key={index} className="w-full relative">
      <div
        onClick={() => onDeleteImage(index)}
        className="bg-light-primary/80 hover:bg-light-primary/50 cursor-pointer rounded-full w-7 h-7 absolute right-3 mt-3 flex items-center justify-center"
      >
        <CustomIcon
          iconName="CloseIcon"
          className="w-4 h-4 fill-light-primary dark:fill-dark-primary"
        />
      </div>
      <img
        key={index}
        src={image}
        alt={`Preview ${index + 1}`}
        className={`${
          imageLength === 1 && index === 0
            ? "h-92"
            : imageLength === 2 && index < 2
            ? "h-72"
            : imageLength > 2
            ? "h-36"
            : ""
        } p-1 rounded-3xl w-full object-cover`}
      />
    </div>
  );
}

export default ImageComponent;
