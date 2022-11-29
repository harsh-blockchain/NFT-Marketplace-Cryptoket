import Image from 'next/image'
import React from 'react'
import { useContext } from 'react'
import images from '../components/assets'
import { NFTContext } from '../context/NFTContext'


const CreaterCard = ({rank,creatorImage,creatorName,creatorEth}) => {


    const {nftCurrency} = useContext(NFTContext);
  return (
    <div className='min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border-2 border-nft-red-violet dark:border-nft-gray-3 rounded-3xl flex flex-col p-4 m-4 hover:scale-105 hover:duration-500 transform ease-in-out cursor-pointer hover:shadow-lg transition-all'>

        <div className='w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter rounded-full'>
            <div className='font-poppins text-white font-semibold text-base minlg:text-lg'>{rank}</div>
        </div>

        <div className='my-2 flex justify-center'>

            <div className='relative w-20 h-20 minlg:w-28 minlg:h-28'>

                <Image src={creatorImage} layout='fill' objectFit='cover' alt='name' className='rounded-full' />

                <div className='absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0'>
                    <Image src={images.tick} objectFit='contain' layout='fill' alt='tick' />
                </div>


            </div>

           

        </div>


        <div className='mt-3 minlg:mt-7 text-center flexCenter flex-col'>


            <div className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base'>         
                {creatorName}
            </div> 


            <div className='flex items-center space-x-2 mt-2'>
            <div className='font-poppins dark:text-white text-nft-black-1 font-semibold'>
                    {creatorEth}</div>
                <div className='font-bold'>{nftCurrency}
                </div>
            
            </div>
        </div>


        
    </div>
  )
}

export default CreaterCard