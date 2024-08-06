import { CiFileOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
const SideBar = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-5">
        <div className="flex items-center group gap-2 cursor-pointer hover:text-blue-500">
          <CiFileOn className="h-8 w-8 " />
          <p className="text-[14px] font-semibold text-gray-700 group-hover:text-blue-500">
            All Files
          </p>
        </div>
        <div className="flex items-center gap-2 group hover:text-blue-500 cursor-pointer">
          <CiStar className="h-8 w-8 " />
          <p className="text-[14px] font-semibold text-gray-700 group-hover:text-blue-500">
            Favorites
          </p>
        </div>
        <div className="flex items-center gap-2 group hover:text-blue-500 cursor-pointer">
          <CiTrash className="h-8 w-8 " />
          <p className="text-[14px] font-semibold text-gray-700 group-hover:text-blue-500">
            Trash
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
