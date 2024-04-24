import React from "react";
import { CustomIcon } from "../ui/custom-icon";

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
  return (
    <button
      key={data.iconName}
      onClick={data.onClick}
      className="w-1/4 flex flex-row items-end"
    >
      <div className="group flex flwx-row justify-center items-center">
        <div
          className={`flex ${data.bgColor} justify-center rounded-full p-1  `}
        >
          <CustomIcon
            iconName={data.iconName as any}
            className={`h-5 w-5 fill-[#8f93a0] ${data.fillColor}`}
          />
        </div>
        <p className={`text-xs text-[#8f93a0]  ${data.textColor}`}>
          {data.totalAmount}
        </p>
      </div>
    </button>
  );
};

export default IconButton;
