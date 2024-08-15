import DashboardHeader from "../Dashboard/dashboardHeader";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/types";
import Dashboard from "../Dashboard/dashboard";

const TrashFiles = () => {
  // const currentUser: User = useAppSelector(
  //   (state: any) => state.user.currentUser
  // );
  // const [searchQuery, setSearchQuery] = useState("");
  return <Dashboard favorite={false} trash={true} />;
};

export default TrashFiles;
