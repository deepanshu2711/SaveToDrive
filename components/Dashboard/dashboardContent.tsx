import DashboardFilter from "./dashboardFilter";
import FileCard from "./FileCard";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-10">
      <DashboardFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
      </div>
    </div>
  );
};

export default DashboardContent;
