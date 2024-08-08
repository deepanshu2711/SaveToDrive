"use client";
import { useEffect, useState } from "react";
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

interface DashboardFilterProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;

  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

const DashboardFilter = ({
  selectedTab,
  setSelectedTab,
  typeFilter,
  setTypeFilter,
}: DashboardFilterProps) => {
  // const [selectedTab, setSelectedTab] = useState("Grid");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleValueChange = () => {
    if (selectedTab === "Grid") {
      setSelectedTab("Table");
    } else if (selectedTab === "Table") {
      setSelectedTab("Grid");
    }
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-[22px] font-semibold md:hidden ">Your Files</p>
      <div className="md:block hidden">
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="image">IMAGE</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="doc">DOCX</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilter;
