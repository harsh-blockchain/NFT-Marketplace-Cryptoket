import { useEffect, useRef, useState } from "react"
import { Banner } from "../components"
import {CreaterCard} from "../components"
import images from '../components/assets'
import Image from "next/image";
import { useTheme } from 'next-themes'
import NftCards from "../components/NftCards";

const Home = () =>  {

  

  const isScrollable = () => {

    const {current} = scrollRef;
    const {current:parent} = parentRef;

    if(current?.scrollWidth > parent?.clientWidth){
      setHideButtons(false);
    }else{
      setHideButtons(true);
    }

  }

  const {theme} = useTheme();
  const [hideButtons,setHideButtons] = useState(false);


  if (typeof window !== "undefined") {
    // browser code
    const scrollAmount = window.innerWidth > 7800 ? 270 : 210;

  }
  


  const parentRef = useRef(null);
  const scrollRef = useRef(null);


  const handleScroll = (direction) => {
    const {current} = scrollRef;

    if(direction === 'left') {
      current.scrollLeft -= scrollAmount;
    }
    else {
      current.scrollLeft += scrollAmount;
    }

  }



  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);


    return () => {
      window.addEventListener('resize', isScrollable);

    }

  })

  return (
    <div className="flex justify-center sm:px-4 p-12">

      <div className="w-full minmd:w-4/5">

        <Banner 
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 sx:p-4 xs:h-44 rounded-3xl"

        childStyle='md:text-4xl sm:text-2xl xs:text-xl text-left'

        text='Discover, Collect and sell extraordinary NFTs'
        />

      

      <div>

        <div className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Best Creaters
        </div>

        <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>

          <div className="flex flex-row overflow-x-scroll no-scrollbar w-max select-none" ref={scrollRef}>

            {[6,7,8,9,10].map((i) => (
              
                <CreaterCard
                key={`creater-${i}`}
                rank={i}
                creatorImage={images[`creator${i}`]}
                creatorName='0x5fgc5....hft5E'
                creatorEth={10- i * 0.54}
                 />
              
            ))}

            {!hideButtons && (
              <div>
                <div 
                  onClick={() => handleScroll('left')}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">

                  <Image src={images.left} layout='fill' objectFit='contain' alt='arrow'                 className={theme === 'light' && 'filter invert'} />


                  </div>


                  <div 
                  onClick={() => handleScroll('right')}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">

                  <Image src={images.right} layout='fill' objectFit='contain' alt='right'                 className={theme === 'light' && 'filter invert'} />


            </div>
          </div>
            )}

          </div>
        </div>

      </div>

      <div className="mt-10">

        <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start ">


            <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Top NFTs
            </h1>

            <div className="dark:bg-nft-black-4 border-2 dark:border-nft-gray-2 bg-white px-8 py-3 rounded-full border-nft-black-4">
              <input className="outline-none text-md bg-transparent -ml-4 mr-3" placeholder="Search NFTs" />

              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </div>


         </div>






          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">

            {[1,2,3,4,5,6,7,8,9,10].map((i) => (
              <NftCards
              key={`nft-${i}`}
              nft={{
                i,
                name: `nifty NFT ${i}`,
                price: (10 - i * 0.534).toFixed(3),
                seller: '0x5fgc5....hft5E',
                owner: '0x5fgc5....hft5E',
                description: 'Cool NFT on Sale',
              }

              }
               
              
              />
            ))}

          </div>

        

      </div>


      </div>

    </div>
  )
}

export default Home;
