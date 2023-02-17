import { useState, useEffect, useRef } from "react";

export const useRandomNumber = () => {
  const [colorId, setColorId] = useState<number>();
  const ref = useRef<boolean>(false);
  useEffect(() => {
    if (!ref.current) {
      var sids = sessionStorage.getItem("colors");
      var ids;
      ids = sids && JSON.parse(sids);
      if (ids?.length === 0 || !ids) {
        sessionStorage.setItem("colors", JSON.stringify([0, 1, 2, 3]));
        ids = [0,1,2,3]
      }
      const random = ids && Math.floor(Math.random() * ids.length);
      const item = ids && ids[random];
      ids.splice(random, 1)
      sessionStorage.setItem("colors", JSON.stringify(ids));
      setColorId(item);
      ref.current = true;
    }
  }, []);

  return colorId;
};
