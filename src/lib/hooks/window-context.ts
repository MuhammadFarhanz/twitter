import { useState, useEffect } from "react";

function useWindow() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 500; // Adjust the threshold as needed
      //   const isLaptopDevice = window.innerWidth <= 1024;

      setIsMobile(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
  };
}

export default useWindow;
