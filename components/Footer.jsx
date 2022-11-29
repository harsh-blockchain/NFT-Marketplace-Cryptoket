import Image from "next/image"
import { useTheme } from "next-themes"

import images from './assets'
import Button from "./Button"
import FooterLinks from "./FooterLinks"



const Footer = () => {

    const {theme} = useTheme();


  return (
    <footer className="flexCenter flex-col border-t-2 dark:bg-nft-dark border-nft-black-1 sm:py-8 py-16">


    <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16 mt-5">

        <div className="flexStart flex-1 flex-col">

            <div className="flexCenter cursor-pointer">
                <Image src={images.logo02} width={35} height={35} objectFit='contain' alt='logo' /> 

                <p className='dark:text-white text-nft-black-1 font-semibold text-lg ml-1'>

                    CryptoKet
                </p>
            </div>

            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
               Get the Latest updates 
            </p>


            <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">

                <input type='email' placeholder="Your Email" className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 text-xs minlg:text-lg font-normal outline-none" />

                <div className="flex-initial">
                    <Button btnName='Email me' classStyles='rounded-md' />
                </div>

            </div>

        </div>


        <div className="flex-1 flexBetweenStart ml-10 md:ml-0 md:mt-8 flex-wrap">

            <FooterLinks heading="CryptoKet" items={['Explore','How it Works','Contact Us']} />

            <FooterLinks heading="Support" items={['Help Center','Terms of Service','Legal Policy']} />

        </div>








    </div>












        {/* lower part */}

        <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">

            <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                    Cryptoket, Inc. All Rights Reserved.
                </p>

           <div className="flex flex-row sm:mt-4">
           {[images.instagram,images.twitter,images.telegram,images.discord].map((item,index) => (
                <div className="mx-2 cursor-pointer" key={index}>
                    <Image src={item} 
                    objectFit='contain'
                    width={24}
                    height={24}
                    alt='social'
                    className={theme === 'light' && 'filter invert'} />
                    
                    
                </div>
            ))}
           </div>

            </div>

        </div>

    </footer>
  )
}

export default Footer