"use client";
import { useState } from "react";
import DashboardHeader from "../Dashboard/dashboardHeader";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/types";
import DashboardContent from "../Dashboard/dashboardContent";

const TrashFiles = () => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="px-5 md:px-10">
      <DashboardHeader
        title="Trash Files"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={currentUser}
      />
      <DashboardContent
        searchQuery={searchQuery}
        user={currentUser}
        trash={true}
      />
    </div>
  );
};

export default TrashFiles;
