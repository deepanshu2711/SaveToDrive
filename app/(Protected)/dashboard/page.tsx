import Dashboard from "@/components/Dashboard/dashboard";
import { usePathname } from "next/navigation";

const DashBoard = () => {
  return (
    <div className="w-full">
      <Dashboard favorite={false} trash={false} />
    </div>
  );
};

export default DashBoard;
