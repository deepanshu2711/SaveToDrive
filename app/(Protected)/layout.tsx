import { Header } from "@/components/Header/Header";
import SideBar from "@/components/SIdebar/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex mt-5 md:mt-10">
        <div className="w-1/6 hidden md:block">
          <SideBar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
