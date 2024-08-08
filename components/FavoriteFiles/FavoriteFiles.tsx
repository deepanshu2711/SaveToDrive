"use client";
import { useState } from "react";
import DashboardHeader from "../Dashboard/dashboardHeader";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/types";
import DashboardContent from "../Dashboard/dashboardContent";

const FavoriteFiles = () => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="px-5 md:px-10">
      <DashboardHeader
        title="Favorites"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={currentUser}
      />
      <DashboardContent
        searchQuery={searchQuery}
        user={currentUser}
        favorite={true}
      />
    </div>
  );
};

export default FavoriteFiles;
