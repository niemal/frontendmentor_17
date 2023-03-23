import { useEffect, useState } from "react";

export function useHistory() {
  const [_, setForceUpdate] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setForceUpdate((prev) => !prev);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const goBack = () => {
    window.history.back();
  };

  return { goBack };
}
