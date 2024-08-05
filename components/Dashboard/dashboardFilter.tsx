"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { PiRowsThin } from "react-icons/pi";
import { PiGridFourThin } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DashboardFilter = () => {
  const [selectedTab, setSelectedTab] = useState("Grid");
  const handleValueChange = () => {
    if (selectedTab === "Grid") {
      setSelectedTab("Table");
    } else {
      setSelectedTab("Grid");
    }
  };
  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <Tabs value={selectedTab} onValueChange={handleValueChange}>
          <TabsList>
            <TabsTrigger value="Grid">
              <div className="flex items-center gap-2">
                <PiGridFourThin className="h-6 w-6" />
                <p className="md:block hidden">Grid</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Table">
              <div className="flex items-center gap-2">
                <PiRowsThin className="h-6 w-6" />
                <p className="md:block hidden">Table</p>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[14px] font-semibold text-gray-700 hidden md:block">
          Type Filter
        </p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">PDF</SelectItem>
            <SelectItem value="dark">CSV</SelectItem>
            <SelectItem value="system">IMAGE</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilter;