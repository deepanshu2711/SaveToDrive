"use client";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { handleImageUpload } from "@/lib/storage";
import { User } from "@/types";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";

interface DashBoardHeaderProps {
  user: User | null;
  title: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filename: string;
  setFile: (file: File | null) => void;
  uploading: boolean;
  setTitle: (filename: string) => void;
  handleUpload: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  favorite: boolean;
  trash: boolean;
}

const DashboardHeader = ({
  user,
  searchQuery,
  setSearchQuery,
  handleUpload,
  filename,
  setFile,
  uploading,
  setTitle,
  isOpen,
  setIsOpen,
  favorite,
  trash,
}: DashBoardHeaderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) return null;

  const handleFilechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const allowedExtensions = /(\.pdf|\.csv|\.doc|\.docx|\.jpg|\.jpeg|\.png)$/i;

    if ((file?.size as number) > 1048576) {
      alert("File size cannot exceed 1 MB.");
      setFile(null);
    } else if (!allowedExtensions.test(file?.name as string)) {
      alert("Only PDF, CSV, DOC/DOCX, and image files are allowed.");
      setFile(null);
    } else {
      setFile(file as File);
    }
  };

  if (!user || !mounted) {
    return (
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="w-[300px] h-[50px]" />
        <Skeleton className="w-[300px] h-[50px]" />
        <Skeleton className="w-[300px] h-[50px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-5 border-b md:border-0">
      <div className="flex md:hidden gap-5 items-center">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="file name"
        />
        <Button>
          <CiSearch className="h-6 w-6" />
          <p className="ml-2 hidden">Search</p>
        </Button>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="md:text-5xl hidden md:block text-3xl font-bold ">
          {favorite ? "Favorite" : trash ? "Trash" : "Dashboard"}
        </p>
        <div className="md:flex hidden gap-2 items-center">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="file name"
          />
          <Button>
            <CiSearch className="h-6 w-6" />
            <p className="ml-2">Search</p>
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          {favorite === false && trash === false && (
            <div>
              <DialogTrigger onClick={() => setIsOpen(true)}>
                <div className="w-full  bg-gray-950 dark:bg-white hover:dark:bg-gray-100 dark:text-black text-white px-5 py-2 rounded-md hover:bg-gray-800">
                  Upload file
                </div>
              </DialogTrigger>
            </div>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Your File Here</DialogTitle>
              <DialogDescription>
                This file is only accessible to you
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <Input
                value={filename}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
              <Input
                onChange={handleFilechange}
                type="file"
                className="cursor-pointer"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpload} type="submit">
                {uploading ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Upload"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardHeader;
