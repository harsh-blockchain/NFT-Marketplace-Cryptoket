import axios from "axios";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import web3Modal from "web3modal";
import { create } from "ipfs-http-client";
import { ContractAddress, ContractABI } from "./config";

export const NFTContext = React.createContext();

const client = create("/ip4/127.0.0.1/tcp/5001");

const dedicatedEndPoint = "https://ipfs.io";

export const NFTProvider = ({ children }) => {
  const nftCurrency = "ETH";

  const [account, setAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install Metamask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    console.log(accounts[0]);

    if (accounts.length !== 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No account available");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      console.log(added);

      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);

      return url;
    } catch (error) {
      console.log(("Error uploading to IPFS", error));
    }
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);
      console.log(1);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
      console.log(2);
      router.push("/");
    } catch (error) {
      console.log("Error uploading to ipfs");
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer
      );

      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const listingPrice = await contract.getListingPrice();

      const tnx = await contract.createToken(url, price, {
        value: listingPrice.toString(),
      });

      await tnx.wait();
    } catch (error) {}
  };

  const fetchNFT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer
      );

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    createSale("test", 0.025);
  });

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        account,
        uploadToIPFS,
        createNFT,
        fetchNFT,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
