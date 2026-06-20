import Banner from "@/components/hompage/Banner";
import FeaturedClasses from "@/components/hompage/FeaturedClasses";
import LatestClasses from "@/components/hompage/LatestClasses";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <FeaturedClasses />
      <LatestClasses />
    </div>
  );
}
