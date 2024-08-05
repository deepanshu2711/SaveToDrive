import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-5 pb-5 border-b md:border-0">
      <div className="flex md:hidden gap-5 items-center">
        <Input type="text" placeholder="file name" />
        <Button>
          <CiSearch className="h-6 w-6" />
          <p className="ml-2 hidden">Search</p>
        </Button>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="md:text-5xl hidden md:block text-3xl font-bold text-gray-900">
          Your Files
        </p>
        <div className="md:flex hidden gap-2 items-center">
          <Input type="text" placeholder="file name" />
          <Button>
            <CiSearch className="h-6 w-6" />
            <p className="ml-2">Search</p>
          </Button>
        </div>
        <Button className="w-full md:max-w-fit">Upload file</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
