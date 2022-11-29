import React from "react";
import Image from "next/image";
import Link from "next/link";

import images from "../components/assets";

const NftCards = ({ nft }) => {
  return (
    <Link href={{ pathname: "/test/nft-details", query: nft }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:minw-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-lg hover:scale-105 hover:duration-500 transform ease-in-out transition-all border-2 border-nft-red-violet dark:border-nft-gray-3">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            alt="nft"
          />
        </div>

        <div className="mt-3 flex-col flex">
          <div className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-lg">
            {nft.name}
          </div>

          <div className="flexBetween mt-1  minlg:mt-3 flex-row sx:flex-col xs:items-start xs:mt-3">
            <div className="flex space-x-1 items-center">
              <div className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm  minlg:text-xl ">
                {nft.price}
              </div>
              <div className="font-semibold">ETH</div>
            </div>
            <div className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs  minlg:text-xl">
              {nft.seller.slice(0, 5)}...
              {nft.seller.slice(-5, nft.seller.length)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NftCards;
