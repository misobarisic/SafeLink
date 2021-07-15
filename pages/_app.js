// import "tailwindcss/tailwind.css"
import "../styles/global.css"

import {useEffect} from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log(`You're using SafeLink version: ${require("../package.json").version}`)
  }, [])
  return <Component {...pageProps} />
}
