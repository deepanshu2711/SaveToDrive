"use client";
import { useAppSelector } from "@/redux/hook";
import DashboardContent from "./dashboardContent";
import DashboardHeader from "./dashboardHeader";
import { FileWithUser, User } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { handleImageUpload } from "@/lib/storage";

interface DashBoardProps {
  favorite?: boolean;
  trash?: boolean;
}

const Dashboard = ({ favorite, trash }: DashBoardProps) => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );

  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    await handleImageUpload(file as File)
      .then(async (res) => {
        if (res.success) {
          try {
            const responce = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
              {
                userId: currentUser?.id,
                title: title,
                fileUrl: res.downloadUrl,
                type: file?.type.split("/")[1],
              },
              { withCredentials: true }
            );

            if (responce.status === 201) {
              const allnewFiles = [...allFiles, responce.data];
              setAllFiles(allnewFiles);
              toast({
                title: "File uploaded successfully",
                variant: "success",
              });
            } else if (responce.status === 200) {
              toast({
                title: responce.data,
                variant: "default",
              });
            }
          } catch (error) {
            toast({
              title: "Something went wrong",
              variant: "destructive",
            });
          }
        }
      })
      .finally(() => {
        setTitle("");
        setFile(null);
        setIsOpen(false);
        setUploading(false);
      });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [allFiles, setAllFiles] = useState<FileWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  // const [favorite, setFavorite] = useState(false);
  // const [trash, setTrash] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/dashboard/favorites") {
  //     setSearchQuery("");
  //     setFavorite(true);
  //     setTrash(false);
  //   } else if (pathname === "/dashboard/trash") {
  //     setSearchQuery("");
  //     setFavorite(false);
  //     setTrash(true);
  //   } else {
  //     setSearchQuery("");
  //     setFavorite(false);
  //     setTrash(false);
  //   }
  // }, [pathname]);

  console.log(pathname);

  useEffect(() => {
    if (!currentUser?.id) return;
    const fetchAllUserFiles = async () => {
      setLoading(true);
      try {
        const responce = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/files?userId=${currentUser.id}&isFavorite=${favorite}&isDeleted=${trash}`
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
  }, [currentUser, favorite, trash]);

  return (
    <div className="w-full px-5 md:px-10">
      <DashboardHeader
        favorite={favorite || false}
        trash={trash || false}
        filename={title}
        setFile={setFile}
        setTitle={setTitle}
        handleUpload={handleUpload}
        uploading={uploading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Your Files"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={currentUser}
      />
      <DashboardContent
        allFiles={allFiles}
        setAllFiles={setAllFiles}
        loading={loading}
        searchQuery={searchQuery}
        user={currentUser}
      />
    </div>
  );
};

export default Dashboard;
