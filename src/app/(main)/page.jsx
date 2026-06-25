import Banner from "@/components/hompage/Banner";
import ClientSay from "@/components/hompage/ClientSay";
import FeaturedClasses from "@/components/hompage/FeaturedClasses";
import LatestClasses from "@/components/hompage/LatestClasses";
import OurMission from "@/components/hompage/OurMission";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <FeaturedClasses />
      <LatestClasses />
      <ClientSay />
      <OurMission />
    </div>
  );
}
