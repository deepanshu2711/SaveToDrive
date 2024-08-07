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
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  const currentUser: User = useAppSelector(
    (state: any) => state.user.currentUser
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="flex sticky top-0 z-50 backdrop-blur-md   items-center justify-between md:px-10 px-5 md:py-4 py-2 shadow-md">
      <IoMdMenu className="md:hidden h-8 w-8" />
      <div className=" items-center gap-2 flex">
        <Image src="/logo.png" alt="logo" width={60} height={60} />
        <h1 className="text-xl font-semibold ">SaveToDrive</h1>
      </div>
      <Button className="hidden md:block" variant={"outline"}>
        Your Files
      </Button>
      <div className="flex items-center gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuItem onClick={handleLogout}>
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
