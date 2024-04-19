import React, { useState } from "react";
import { Dialog } from "../ui/dialog";

interface RenderImagesProps {
  setSelectedImageId: React.Dispatch<React.SetStateAction<any>>;
  setImageDialogOpen: React.Dispatch<React.SetStateAction<any>>;
  imageDialogOpen: boolean;
  images: { url: string; id: any }[];
}

const RenderImages: React.FC<RenderImagesProps> = ({
  setSelectedImageId,
  setImageDialogOpen,
  imageDialogOpen,
  images,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>, imageId: any) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedImageId(imageId);
    setImageDialogOpen(true);
  };

  return (
    <>
      {images.length === 3 ? (
        <Dialog open={imageDialogOpen}>
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="col-span-1">
              <img
                className="h-80 w-full object-cover cursor-pointer"
                src={images[0]?.url}
                alt={`Image 1`}
                onClick={(e) => handleClick(e, images[0]?.id)}
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 h-full gap-[2px]">
              {images.slice(1, 3).map((subImage: any, subIndex: number) => (
                <img
                  className="w-full object-cover h-[160px] cursor-pointer"
                  src={subImage?.url}
                  alt={`Image ${subIndex + 2}`}
                  onClick={(e) => handleClick(e, subImage?.id)}
                />
              ))}
            </div>
          </div>
        </Dialog>
      ) : (
        images.map((image: any, index: number) => (
          <Dialog key={index} open={imageDialogOpen}>
            <img
              className="w-full object-cover cursor-pointer"
              src={image?.url}
              alt={`Image ${index + 1}`}
              onClick={(e) => handleClick(e, image?.id)}
            />
          </Dialog>
        ))
      )}
    </>
  );
};

export default RenderImages;
