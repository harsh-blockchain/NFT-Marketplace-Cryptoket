import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useMemo, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components";
import images from "../../components/assets";
import Input from "../../components/Input";
import { NFTContext } from "../../context/NFTContext";

const CreateNft = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTContext);

  const { theme } = useTheme();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  console.log(formInput);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log(url);
    setFileUrl(url);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const filestyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-nft-gray-1 border-2 border-nft-black-3 flex flex-col items-center p-5 rounded-md border-dashed 
    
    ${isDragActive && "border-file-active"}
    ${isDragReject && "border-file-reject"}
    ${isDragAccept && "border-file-accept"}
    
    `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <div className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create NFT
        </div>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xl font-semibold">
            Upload File
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={filestyle}>
              <input {...getInputProps()} className="" />

              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 text-xl font-semibold">
                  JPG, PNG, GIF, SVG, WEBM . Max 100 mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="upload"
                    className={theme === "light" && "filter invert"}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 text-sm font-semibold">
                  Drag and Drop File
                </p>

                <p className="font-poppins dark:text-white text-nft-black-1 text-sm mt-3 font-semibold">
                  or Browse media on your device
                </p>
              </div>
            </div>

            {fileUrl && (
              <aside>
                <div className="p-5">
                  <img src={fileUrl} alt="asset file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="name"
          placeholder="Nft Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Nft Description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Nft price"
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNft;
