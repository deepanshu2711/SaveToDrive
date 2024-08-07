"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiFileOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
const SideBar = () => {
  const params = usePathname();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-5">
        <Link
          href={"/dashboard"}
          className={`flex items-center group gap-2 cursor-pointer hover:text-blue-500 ${
            params === "/dashboard" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          <CiFileOn className="h-8 w-8 " />
          <p className="text-[14px] font-semibold  group-hover:text-blue-500">
            All Files
          </p>
        </Link>
        <Link
          href={"/dashboard/favorites"}
          className={`flex items-center gap-2 group hover:text-blue-500 cursor-pointer ${
            params === "/dashboard/favorites"
              ? "text-blue-500"
              : "text-gray-700"
          }`}
        >
          <CiStar className="h-8 w-8 " />
          <p className="text-[14px] font-semibold  group-hover:text-blue-500">
            Favorites
          </p>
        </Link>
        <Link
          href={"/dashboard/trash"}
          className={`flex items-center gap-2 group hover:text-blue-500 cursor-pointer ${
            params === "/dashboard/trash" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          <CiTrash className="h-8 w-8 " />
          <p className="text-[14px] font-semibold text-gray-700 group-hover:text-blue-500">
            Trash
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
