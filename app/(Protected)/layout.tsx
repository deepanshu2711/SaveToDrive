import { Header } from "@/components/Header/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
