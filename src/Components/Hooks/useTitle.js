import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `ToyGem | ${title}`;
  }, [title]);
};

export default useTitle;  
