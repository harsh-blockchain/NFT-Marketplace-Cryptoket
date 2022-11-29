import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import NftCards from "../../components/NftCards";
import { NFTContext } from "../../context/NFTContext";
import Banner from "../../components/Banner";
import Image from "next/image";
import images from "../../components/assets";

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchMyOrListedNfts, account } = useContext(NFTContext);

  useEffect(() => {
    fetchMyOrListedNfts("fetchMyNFTs").then((items) => {
      setIsLoading(true);
      setNfts(items);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          text="Your minted NFTs"
          childStyle="text-center mb-4"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full -mt-20 z-0">
          <Image
            src={images.creator1}
            className="rounded-full object-cover "
            objectFit="cover"
          />
        </div>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
          {account.slice(0, 5)}...
          {account.slice(-5, account.length)}
        </p>
      </div>

      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16 font-poppins dark:text-white text-nft-black-1 font-extrabold text-2xl">
          <div>No Nfts Owned</div>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NftCards key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
