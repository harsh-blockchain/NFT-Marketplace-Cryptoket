import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React,{useEffect,useState,useContext} from 'react'
import Image from 'next/image'
import Link from 'next/link' 
import images from './assets'
import {Button} from './'
import { NFTContext } from '../context/NFTContext'




const MenuItems = ({isMobile,active,setActive}) => {
    const generateLink = (index) => {
        switch (index) {
            case 0:
                return '/';

            case 1:
                return '/test/created-nfts';

            case 2:
                return '/test/my-nfts';
                
                
            default:
                return '/';
        }
    }


    return (
        <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
            {['Explore NFTs','Listed NFTs','My NFTs'].map((item,index) => (
                <li key={index}
                onClick={() => {
                    setActive(item)
                }}
                className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
                ${active === item ? 'dark:text-white text-nft-dark' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}>

                    <Link href={generateLink(index)}>{item}</Link>


                </li>
                
            ))}
        </ul>
    )
}
 

const ButtonGroup = ({setActive,router}) => {

    const {connectWallet,account} = useContext(NFTContext);

    return account ? (
        <Button classStyles='mx-2 rounded-xl hover:scale-105 transform ease-in-out duration-300' 
        btnName='Create' 
        handleClick={() => {
            setActive('');
            router.push('/test/create-nft')

        }} />
        
        
    ):
    (
        <Button classStyles='mx-2 rounded-xl hover:scale-105 transform ease-in-out duration-300'
        btnName='Connect Wallet'
        handleClick={connectWallet}
        />
    )
}

const Navbar = () => {

    

    const {theme,setTheme} = useTheme();
    const [active, setActive] = useState('Explore NFTs')
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1'>


        <div className='flex flex-1 flex-row justify-start'>
            <Link href='/'>
                <div className='flex items-center md:hidden cursor-pointer space-x-2'
                onClick={() => {}}>
                    <Image src={images.logo02} width={35} height={35} objectFit='contain' alt='logo' /> 

                    <p className='dark:text-white text-nft-black-1 font-semibold text-lg ml-1'>

                        CryptoKet
                    </p>
                </div>
            </Link>



            <Link href='/'>

                    <div className='hidden md:flex' onClick={() => {}}>

                    <Image src={images.logo02} width={35} height={35} objectFit='contain' alt='logo' /> 

                    </div>
            </Link>
        </div>


        {/* themes */}


        <div className='flex flex-row flex-initial justify-end'>
            <div className='flex items-center mr-2'>

                <input 
                type='checkbox' className='checkbox' id='checkbox' 
                onChange={() =>  setTheme(
                    theme === 'dark' ? 'light' : 'dark'
                )}  />

                <label htmlFor='checkbox' className='flexBetween w-10 h-5 bg-black rounded-2xl p-1 relative label cursor-pointer' >
                    <i className='fas fa-sun' />
                    <i className='fas fa-moon' />
                    <div className='absolute w-5 h-4 bg-white rounded-full ball' />
                </label>

            </div>
            <div className='md:hidden flex'>
                <MenuItems active={active} setActive={setActive} />


                <div className='ml-4'>
                    <ButtonGroup setActive={setActive} router={router} />
                </div>
            
        </div>


        </div>

        {/* theme end */}




        <div className='hidden md:flex ml-2'>
            {isOpen ? (
                <Image src={images.cross}
                objectFit='contain'
                width={20}
                height={20}
                alt='cross'
                onClick={() => setIsOpen(false)}
                className={theme === 'light' && 'filter invert'} />
            ) : (
                <Image src={images.menu}
                objectFit='contain'
                width={25}
                height={25}
                alt='menu'
                onClick={() => setIsOpen(true)}
                className={theme === 'light' && 'filter invert'} />

            )}


            {isOpen && (
                <div className='fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col'>
                    <div className='flex-1 p-4'>
                        <MenuItems active={active} setActive={setActive} isMobile />
                    </div>

                    <div className='p-4 border-t dark:border-nft-black-1 border-nft-gray-1'>

                        <ButtonGroup setActive={setActive} router={router} />

                    </div>
                </div>
            )}
        </div>




        

    </nav>
  )
}

export default Navbar
