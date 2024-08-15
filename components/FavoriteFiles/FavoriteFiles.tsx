import { useState } from "react";
import DashboardHeader from "../Dashboard/dashboardHeader";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/types";
import DashboardContent from "../Dashboard/dashboardContent";
import Dashboard from "../Dashboard/dashboard";

const FavoriteFiles = () => {
  // const currentUser: User = useAppSelector(
  //   (state: any) => state.user.currentUser
  // );
  // const [searchQuery, setSearchQuery] = useState("");
  return <Dashboard favorite={true} trash={false} />;
};

export default FavoriteFiles;
