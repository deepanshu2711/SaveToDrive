"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoMdMenu } from "react-icons/io";
import { useAppSelector } from "@/redux/hook";
import { User } from "@/types";
import { MdOutlineLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";

export const Header = () => {
  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );

  if (!currentUser) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const responce = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,
        { withCredentials: true }
      );
      if (responce.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex sticky top-0 z-50 bg-white items-center justify-between md:px-10 px-5 md:py-4 py-2 shadow-md">
      <IoMdMenu className="md:hidden h-8 w-8" />
      <div className=" items-center gap-2 flex">
        <Image src="/logo.png" alt="logo" width={60} height={60} />
        <h1 className="text-xl font-semibold text-gray-800">SaveToDrive</h1>
      </div>
      <Button className="hidden md:block" variant={"outline"}>
        Your Files
      </Button>
      <div className="flex items-center gap-10">
        <div className="hidden md:block">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Orginizations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">My Personal</SelectItem>
              <SelectItem value="dark">Orginization 1</SelectItem>
              <SelectItem value="system">Orginization 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={currentUser?.imageUrl as string} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <div className="flex items-center justify-around w-full ">
                <MdOutlineLogout className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
