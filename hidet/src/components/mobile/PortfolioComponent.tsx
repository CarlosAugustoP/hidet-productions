import MobileLayout1 from "./MobileLayout1";
import MobileLayout2 from "./MobileLayout2";
import MobileLayout3 from "./MobileLayout3";
import MobileLayout4 from "./MobileLayout4";
import MobileLayout5 from "./MobileLayout5";


export default function PortfolioComponent() {
    return (
        <div className='w-full min-h-screen flex justify-center'>
            <div className="w-full flex flex-col items-center mt-8 gap-6">
                <MobileLayout1 />
                <MobileLayout2 />
                <MobileLayout3 />
                <MobileLayout4 />
                <MobileLayout5 />
            </div>
        </div>
    );
}