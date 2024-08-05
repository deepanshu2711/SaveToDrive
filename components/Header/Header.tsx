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

export const Header = () => {
  return (
    <div className="flex fixed top-0 left-0 right-0 bg-white items-center justify-between md:px-10 px-5 md:py-4 py-2 shadow-md">
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
