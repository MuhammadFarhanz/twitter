import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC } from "react";

interface CustomTooltipProps {
  trigger: React.ReactNode;
  content: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ trigger, content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent
          className="bg-[#495A69] min-w-9 h-[20px] text-xs flex justify-center items-center mt-1 rounded-[2px] p-1 z-30 text-white"
          side="bottom"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
