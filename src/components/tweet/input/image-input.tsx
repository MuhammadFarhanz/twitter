import { CustomIcon } from "@/components/ui/custom-icon";
import React from "react";

export const svg = [
  {
    iconName: "MediaIcon",
  },
  {
    iconName: "GifIcon",
  },
  {
    iconName: "PollIcon",
  },
  {
    iconName: "EmojiIcon",
  },
  {
    iconName: "ScheduleIcon",
  },
  {
    iconName: "LocationIcon",
  },
];
interface ImageInputProps {
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageInput(props: ImageInputProps) {
  return (
    <div className="flex items-center justify-center text-main-accent xs:[&>button:nth-child(n+6)]:hidden md:[&>button]:!block [&>button:nth-child(n+4)]:hidden">
      {svg.map(({ ...data }, index) => (
        <label key={index} className="flex items-center">
          <input
            className="hidden"
            type="file"
            accept="images/*"
            multiple
            onChange={props.handleFileInputChange}
            disabled={index !== 0 && true}
            name="image"
          />
          <CustomIcon
            iconName={data.iconName as any}
            className={`mr-3 h-5 w-5 fill-main-accent cursor-pointer ${
              index !== 0 && "opacity-50"
            }`}
          />
        </label>
      ))}
    </div>
  );
}

export default ImageInput;
