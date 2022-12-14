import "../styles/globals.css";
import Script from "next/script";
import { ThemeProvider, useTheme } from "next-themes";
import { NFTProvider } from "../context/NFTContext";
import { Navbar, Footer } from "../components";
import Head from "next/head";
import images from "../components/assets";

function MyApp({ Component, pageProps }) {
  const { theme } = useTheme();

  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Head>
            <title>NFT Marketplace</title>
          </Head>

          <Navbar />

          <div className="pt-65">
            <Component {...pageProps} />
          </div>

          <Footer />
        </div>

        <Script
          src="https://kit.fontawesome.com/0c29592c8c.js"
          crossorigin="anonymous"
        ></Script>
      </ThemeProvider>
    </NFTProvider>
  );
}

export default MyApp;
