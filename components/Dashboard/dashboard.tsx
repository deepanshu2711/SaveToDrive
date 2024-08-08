"use client";
import { useAppSelector } from "@/redux/hook";
import DashboardContent from "./dashboardContent";
import DashboardHeader from "./dashboardHeader";
import { User } from "@/types";
import { useState } from "react";

const Dashboard = () => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-full px-5 md:px-10">
      <DashboardHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={currentUser}
      />
      <DashboardContent searchQuery={searchQuery} user={currentUser} />
    </div>
  );
};

export default Dashboard;
