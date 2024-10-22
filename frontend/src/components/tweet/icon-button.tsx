import React from "react";
import { CustomIcon } from "../ui/custom-icon";
import CustomTooltip from "./ui/tooltip";

interface IconButtonProps {
  data: {
    iconName: string;
    fillColor: string;
    bgColor: any;
    textColor: string;
    totalAmount: any;
    onClick: any;
  };
}

const IconButton: React.FC<IconButtonProps> = ({ data }) => {
  const viewText = data.iconName.replace("Icon", "").replace("Solid", "");

  return (
    <div key={data.iconName} className="w-1/4 flex flex-row items-end">
      <CustomTooltip
        trigger={
          <button
            onClick={data.onClick}
            className={`group flex flwx-row justify-center items-center ${
              data.iconName == "ReplyIcon" ? "-ml-2" : null
            }`}
          >
            <div
              className={`flex ${data.bgColor} justify-center rounded-full p-2`}
            >
              <CustomIcon
                iconName={data.iconName as any}
                className={`h-5 w-5 fill-[#6A6F74] ${data.fillColor}`}
              />
            </div>
            <p className={`text-xs text-[#8f93a0]  ${data.textColor}`}>
              {data.totalAmount}
            </p>
          </button>
        }
        content={viewText}
      />
    </div>
  );
};

export default IconButton;
