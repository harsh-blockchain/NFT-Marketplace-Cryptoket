import Image from "next/image";
import React from "react";
import images from "./assets";

export const Loader = () => {
  return (
    <div className="flexCenter w-full my-4">
      <Image src={images.loader} alt="loader" width={100} objectFit="contain" />
    </div>
  );
};
