import React, { forwardRef, ChangeEvent } from "react";
import { Textarea } from "../../ui/textarea";
import clsx from "clsx";
/* eslint-disable react/display-name */
const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  {
    maxLength?: number;
    value?: string;
    onFocus?: any;
    placeholder?: any;
    className?: any;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onInput: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  }
>(
  (
    { maxLength, value, onChange, onInput, onFocus, placeholder, className },
    ref
  ) => {
    return (
      <Textarea
        ref={ref}
        onInput={onInput}
        maxLength={maxLength}
        onFocus={onFocus}
        className={clsx(
          "border-0 overflow-hidden p-1 resize-none bg-transparent text-xl outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary",
          className
        )}
        placeholder={placeholder}
        name="content"
        onChange={onChange}
        value={value}
      ></Textarea>
    );
  }
);

export default TextareaInput;
