"use client";
import { useAppSelector } from "@/redux/hook";
import DashboardContent from "./dashboardContent";
import DashboardHeader from "./dashboardHeader";
import { User } from "@/types";

const Dashboard = () => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );

  return (
    <div className="w-full px-5 md:px-10">
      <DashboardHeader user={currentUser} />
      <DashboardContent user={currentUser} />
    </div>
  );
};

export default Dashboard;
