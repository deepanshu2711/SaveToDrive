"use client";
import { User } from "@/types";
import DashboardFilter from "./dashboardFilter";
import FileCard from "./FileCard";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

interface DashBoardContentProps {
  user: User | null;
}

const DashboardContent = ({ user }: DashBoardContentProps) => {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true);
  }, []);

  // if (!mounted) return null;
  if (!user || !mounted) {
    return (
      <div className="flex flex-col gap-10 mt-5">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="w-[200px] h-[50px]" />
          <Skeleton className="w-[200px] h-[50px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
          <Skeleton className="w-full h-[350px]" />
          <Skeleton className="w-full h-[350px]" />
          <Skeleton className="w-full h-[350px]" />
        </div>
      </div>
    );
  }

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
