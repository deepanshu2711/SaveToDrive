"use client";
import { File, User } from "@/types";
import DashboardFilter from "./dashboardFilter";
import FileCard from "./FileCard";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreVerticalIcon } from "lucide-react";

interface DashBoardContentProps {
  user: User | null;
  searchQuery: string;
}

type FileWithUser = File & {
  user: User;
};

const DashboardContent = ({ user, searchQuery }: DashBoardContentProps) => {
  const [mounted, setmounted] = useState(false);
  const [allFiles, setAllFiles] = useState<FileWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState<FileWithUser[]>([]);
  const [selectedTab, setSelectedTab] = useState("Grid");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    setmounted(true);
  }, []);

  useEffect(() => {
    const handleSearchQuery = () => {
      setFilteredFiles(allFiles);

      if (!searchQuery || searchQuery === "") {
        if (typeFilter === "all") {
          setFilteredFiles(allFiles);
        } else {
          const filteredFiles = allFiles.filter((file) => {
            return file.type === typeFilter;
          });
          setFilteredFiles(filteredFiles);
        }
      }
      if (searchQuery && searchQuery !== "" && typeFilter === "all") {
        const filteredFiles = allFiles.filter((file) => {
          return file.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredFiles(filteredFiles);
      } else if (searchQuery && searchQuery !== "" && typeFilter !== "all") {
        const filteredFiles = allFiles.filter((file) => {
          return (
            file.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            file.type === typeFilter
          );
        });
        setFilteredFiles(filteredFiles);
      }
    };
    handleSearchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, allFiles, typeFilter]);

  useEffect(() => {
    const fetchAllUserFiles = async () => {
      setLoading(true);
      try {
        const responce = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/files?userId=${user?.id}`
        );
        if (responce.status === 200) {
          setAllFiles(responce.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllUserFiles();
  }, [user]);

  useEffect(() => {
    setFilteredFiles(allFiles);
  }, [allFiles]);

  if (!user || !mounted || loading) {
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

  const selectedTabChange = (currentTab: string) => {
    setSelectedTab(currentTab);
  };

  const filterFilesBytype = (type: string) => {
    if (type === "all") {
      const filteredFiles = allFiles.filter((file) =>
        file.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filteredFiles);
      return;
    } else {
      const filteredFiles = allFiles.filter(
        (file) =>
          file.type === type &&
          file.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filteredFiles);
    }
  };

  const setTypeFilterChange = (type: string) => {
    setTypeFilter(type);
    setFilteredFiles(allFiles);
    filterFilesBytype(type);
  };

  return (
    <div className="flex flex-col gap-10 mb-5">
      <DashboardFilter
        selectedTab={selectedTab}
        setSelectedTab={selectedTabChange}
        setTypeFilter={setTypeFilterChange}
        typeFilter={typeFilter}
      />
      {filteredFiles && filteredFiles.length > 0 && selectedTab === "Grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
          {filteredFiles.map((file, idx) => (
            <FileCard key={idx} file={file} />
          ))}
        </div>
      ) : filteredFiles &&
        filteredFiles.length > 0 &&
        selectedTab === "Table" ? (
        <Table>
          <TableCaption>A list of your all files.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Uploaded On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {filteredFiles.map((file, idx) => (
            <TableBody key={idx}>
              <TableRow>
                <TableCell className="font-medium">{file.title}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={file.user.imageUrl as string} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-[14px] font-medium">
                    {file.user.fullName}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  Uploaded on today at 4:30pm
                </TableCell>
                <TableCell className="text-right flex items-end justify-end">
                  <MoreVerticalIcon className="cursor-pointer" />
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col gap-5 md:flex-row items-center  justify-evenly">
          <Image src={"/empty.svg"} alt="logo" width={300} height={200} />
          <div className="max-w-[500px] ">
            <p className="text-[24px] font-semibold text-gray-700">
              No Files Found !
            </p>
            <p className="text-gray-500 text-[14px] md:block hidden">
              It looks like you have not uploaded any files yet. This app lets
              you store and download various types of files, including images,
              PDFs, CSVs, and DOCX documents. Add your files to see them here!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
