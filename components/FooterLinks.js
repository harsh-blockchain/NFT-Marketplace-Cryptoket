import React from 'react'

const FooterLinks = ({heading,items}) => {
  return (
    <div className='flex-1 justify-start items-start mt-7'>
       <div className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10'>{heading}</div>
       {items.map((item,index) => (
            <p key={index} className='dark:text-white text-nft-black-1 font-poppins font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3'>
                {item}
            </p>
       ))}
    </div>
  )
}

export default FooterLinks