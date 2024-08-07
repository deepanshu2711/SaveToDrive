"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Landing = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const redirectTo = (link: string) => {
    router.push(link);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex sticky top-0 z-50 backdrop-blur-md w-full   items-center justify-between md:px-10 px-5 md:py-4 py-2 shadow-md">
        <Link href={"/"} className=" items-center gap-2 flex">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <h1 className="text-xl font-semibold hidden md:block ">
            SaveToDrive
          </h1>
        </Link>
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
          <Button
            onClick={() => redirectTo("/signin")}
            className=" bg-gray-900 text-white hover:dark:bg-gray-100 hover:bg-gray-800 dark:bg-white px-5 font-medium py-1.5 rounded-lg dark:text-black"
          >
            Sign In
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center h-full justify-around">
        <div className="flex flex-col items-center">
          <h1 className="md:hidden  text-3xl md:max-w-fit max-w-[350px] text-center font-bold">
            Save to Drive
          </h1>
          <Image src="/logo.png" alt="logo" width={300} height={300} />
          <h2 className="md:text-4xl text-2xl md:max-w-fit max-w-[350px] text-center font-bold">
            The easiest way to upload and save your files.
          </h2>
          <p className="text-gray-400 md:max-w-fit max-w-[300px] mt-2 md:mt-5 text-center md:text-[14px] text-[12px]">
            make an account and start managing your files in less than a minute.
          </p>
        </div>
        <div className="flex items-center gap-5 mt-5">
          <Button onClick={() => redirectTo("/dashboard")}> Get Started</Button>
          <Button onClick={() => redirectTo("/")} variant={"secondary"}>
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Learn More</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
