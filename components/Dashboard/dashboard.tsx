import DashboardContent from "./dashboardContent";
import DashboardHeader from "./dashboardHeader";

const Dashboard = () => {
  return (
    <div className="w-full px-5 md:px-10">
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
