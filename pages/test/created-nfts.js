import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import NftCards from "../../components/NftCards";
import { NFTContext } from "../../context/NFTContext";

const CreatedNFTs = () => {
  const { fetchMyOrListedNfts } = useContext(NFTContext);

  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyOrListedNfts("fetchItemsListed").then((items) => {
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

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <div className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No nfts for sale
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <div className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-5 sm:ml-2">
            Nfts Listed for sale
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NftCards key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedNFTs;
