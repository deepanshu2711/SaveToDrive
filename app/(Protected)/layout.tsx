import { Header } from "@/components/Header/Header";
import SideBar from "@/components/SIdebar/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex mt-24 md:mt-36">
        <div className="w-1/6 fixed hidden md:block ">
          <SideBar />
        </div>
        <div className="md:w-5/6 md:ml-[15%] w-full ">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
