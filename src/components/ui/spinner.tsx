import React from "react";

function Spinner() {
  return (
    <div className=" h-12 flex items-center justify-center py-4">
      <div
        className="inline-block h-6 w-6 animate-spin border-main-accent rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}

export default Spinner;
