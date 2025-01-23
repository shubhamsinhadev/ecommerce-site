import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export const LoadingImage = ({
  src,
  title,
}: {
  src: string;
  title: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <img
        src={src}
        alt={title}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          visibility: isLoading ? "hidden" : "visible",
          position: isLoading ? "absolute" : "relative",
        }}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && <Skeleton w={"100%"} h={"100%"} />}
    </>
  );
};
