import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CustomIcon } from "../ui/custom-icon";
import { SidebarLink } from "./sidebar-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";
import useThemeStore from "@/lib/theme-store";

const LinkItem = ({ iconName, text }: any) => (
  <a className="p-0 hover:bg-light-primary/10 font-medium dark:hover:bg-dark-primary/10  cursor-pointer ">
    <div className="px-4 flex flex-row my-3">
      <CustomIcon
        iconName={iconName}
        className="w-5 h-5 fill-light-primary dark:fill-dark-primary mr-2"
      />
      <p>{text}</p>
    </div>
  </a>
);

type CustomRadioGroupItemProps = {
  id: string;
  label: string;
  theme: string;
  textColor: string;
  changeTheme: any;
  className: any;
};

const CustomRadioGroupItem: React.FC<CustomRadioGroupItemProps> = ({
  id,
  label,
  theme,
  textColor,
  changeTheme,
  className,
}) => (
  <button
    onClick={() => changeTheme(theme)}
    className={cn(
      `flex items-center space-x-2 h-full w-full justify-between  border border-dark-secondary/50 rounded-sm px-4 font-semibold`,
      className
    )}
  >
    <div className="w-1/4  flex items-center justify-center">
      <RadioGroupItem value="default" id={id} className="w-5 h-5 bg-white" />
    </div>
    <div className="w-3/4">
      <Label htmlFor={id} className={`text-${textColor} font-semibold`}>
        {label}
      </Label>
    </div>
  </button>
);

function MoreSettings() {
  const { theme, accent, changeAccent, changeTheme } = useThemeStore();
  // // const kontol = getTheme();

  // console.log(theme, accent, changeAccent, changeTheme, "boom");
  // // console.log("bg", kontol.background, "asuuul");
  // // const colors = ["blue", "yellow", "pink", "purple", "orange", "green"];
  const colors = [
    "bg-accent-blue",
    "bg-accent-yellow",
    "bg-accent-pink",
    "bg-accent-purple",
    "bg-accent-orange",
    "bg-accent-green",
  ];

  // console.log(theme, accent, "ini real cuy");
  return (
    <Popover>
      <PopoverContent
        className={`w-80 font-semibold  bg-main-background border-light-border dark:border-dark-border p-0`}
        align="start"
        side="top"
      >
        <div className=" text-light-primary dark:text-dark-primary ">
          <div className="flex flex-row border-b border-light-border dark:border-dark-border p-4">
            <CustomIcon
              iconName="MonetizationIcon"
              className="w-6 h-6 fill-light-primary dark:fill-dark-primary"
            />
            <h4 className="font-bold ml-4 text-xl leading-none">
              Monetization
            </h4>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-0 ">
              <AccordionTrigger className="px-4 font-semibold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
                Creator Studio
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col ">
                  <LinkItem iconName="ViewIcon" text="Analytics" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-0 ">
              <AccordionTrigger className="px-4 font-semibold  hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
                Professional Tools
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col ">
                  <LinkItem iconName="AdsIcon" text="Ads" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-0 ">
              <AccordionTrigger className="px-4 font-semibold  hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
                Settings and Support
              </AccordionTrigger>
              <AccordionContent className="">
                <div className="flex flex-col ">
                  <LinkItem
                    iconName="SettingsIcon"
                    text="Settings and Privacy"
                  />
                  <LinkItem iconName="HelpIcon" text="Help Center" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <a className="p-0  hover:bg-light-primary/10 dark:hover:bg-dark-primary/10  cursor-pointer ">
                        <div className="px-4 flex flex-row my-3 font-medium">
                          <CustomIcon
                            iconName="DisplayIcon"
                            className="w-5 h-5 fill-light-primary dark:fill-dark-primary mr-2"
                          />
                          <p>Display</p>
                        </div>
                      </a>
                    </DialogTrigger>
                    <DialogContent className="bg-main-background border-none text-light-primary dark:text-dark-primary ">
                      <DialogHeader className="flex items-center justify-center h-20 ">
                        <DialogTitle className="font-bold">
                          Customize your view
                        </DialogTitle>
                        <p className="text-sm text-dark-secondary">
                          These Settings affect all the X accounts on this
                          browser.
                        </p>
                        {/* <div className="border w-60 h-40"></div> */}
                      </DialogHeader>
                      <label className="text-dark-secondary text-sm font-semibold">
                        Color
                      </label>
                      <div className="bg-dark-primary/10 h-16 flex flex-row items-center rounded-lg">
                        <RadioGroup className="flex flex-row w-full gap-3 ">
                          {colors.map((color, index) => (
                            // <div className={`${color}`}>kontol{color}</div>

                            <div className={`flex justify-center w-1/6 `}>
                              {/* {`bg-accent-${color}, ${index}`} */}
                              {/* <button
                                onClick={() => {
                                  changeAccent(color);
                                }}
                              > */}
                              <RadioGroupItem
                                onClick={() =>
                                  changeAccent(color.replace("bg-accent-", ""))
                                }
                                className={`h-11  w-11 z-10  ${color}`}
                                value={color}
                                color="red"
                                id={`r${index}`}
                              />
                              {/* </button> */}
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <label className="text-dark-secondary text-sm font-semibold">
                        Background
                      </label>
                      <RadioGroup className="bg-dark-primary/10 rounded-lg h-20 grid grid-cols-3 items-center gap-3 p-2 px-4">
                        <CustomRadioGroupItem
                          id="r1"
                          label="Default"
                          theme="light"
                          textColor="black"
                          className="bg-light text-black"
                          changeTheme={changeTheme}
                        />
                        <CustomRadioGroupItem
                          id="r2"
                          label="Dim"
                          className="bg-dim"
                          theme="dim"
                          textColor="white"
                          changeTheme={changeTheme}
                        />
                        <CustomRadioGroupItem
                          id="r3"
                          label="Lights out"
                          className="bg-black"
                          theme="dark"
                          textColor="white"
                          changeTheme={changeTheme}
                        />
                      </RadioGroup>

                      <div className="flex items-center justify-center">
                        <DialogClose>
                          <Button className="w-20 bg-main-accent rounded-full hover:bg-main-accent/80">
                            Save
                          </Button>
                        </DialogClose>
                      </div>
                      {/* <DialogFooter className="bg-blue-300">
                        <form>fjdsao</form>
                      </DialogFooter> */}
                    </DialogContent>
                  </Dialog>
                  <LinkItem
                    iconName="KeyboardShortcutIcon"
                    text="Keyboard Shortcuts"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <div className="flex flex-row justify-between items-center">
          <p className="font-semibold">Creator Studio</p>
          <CustomIcon
            iconName="ArrowDownIcon"
            className="w-5 h-5 fill-white "
          />
        </div> */}
        </div>
      </PopoverContent>
      <PopoverTrigger>
        <div
          className={cn("group py-1 outline-none hidden xs:flex ")}
          // onClick={disabled ? preventBubbling() : undefined}
        >
          <div
            className={cn(
              `custom-button flex items-center justify-center gap-4 self-start p-2 text-xl transition 
             duration-200 group-hover:bg-light-primary/10 dark:group-hover:bg-dark-primary/10  group-focus-visible:ring-2 rounded-full
             group-focus-visible:ring-[#878a8c] 
             dark:group-focus-visible:ring-white xs:p-3 xl:pr-5`
              // isActive && "font-bold"
            )}
          >
            <CustomIcon
              iconName="CircleMoreIcon"
              className="w-7 h-7 fill-light-primary dark:fill-dark-primary"
            />
            <p className="hidden xl:block">More</p>
          </div>
        </div>

        {/* <SidebarLink
          href=""
          linkName="More"
          iconName="CircleMoreIcon"
          canBeHidden={true}
        /> */}
      </PopoverTrigger>
    </Popover>
  );
}

export default MoreSettings;
