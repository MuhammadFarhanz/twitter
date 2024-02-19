import React, { forwardRef, ChangeEvent } from "react";
import { Textarea } from "../../ui/textarea";

const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  {
    maxLength?: number;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onInput: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  }
>(({ maxLength, value, onChange, onInput }, ref) => {
  return (
    <Textarea
      ref={ref}
      onInput={onInput}
      maxLength={maxLength}
      className="border-0 overflow-hidden p-1 resize-none bg-transparent text-lg outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
      placeholder="What's Happening?"
      name="content"
      onChange={onChange}
      value={value}
    ></Textarea>
  );
});

export default TextareaInput;
