import Script from "next/script";
import { Results } from "@/app/_components/Search/results";
export default function Home(){
    return ( 
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <Script src="https://www.google.com/recaptcha/api.js"></Script>
        <Results />
    </div>
     );
}