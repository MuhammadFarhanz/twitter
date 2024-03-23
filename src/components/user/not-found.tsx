import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col mt-20 ">
      <div className="h-40 w-80">
        <h1 className="text-3xl font-bold">This account doesn’t exist</h1>
        <p className="text-dark-secondary">Try searching for another.</p>
      </div>
    </div>
  );
}

export default NotFound;
