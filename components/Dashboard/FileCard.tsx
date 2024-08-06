import { IoEllipsisVerticalSharp, IoImageOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { File, User } from "@/types";
import { CiFileOn } from "react-icons/ci";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeCsv } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CiTrash } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

interface FileCardProps {
  file: File & {
    user: User;
  };
}

const FileCard = ({ file }: FileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {file.type === "image" ? (
              <IoImageOutline className="h-5 w-5" />
            ) : (
              <CiFileOn className="h-5 w-5" />
            )}
            <p className="text-[24px font-semibold text-gray-700">
              {file.title}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoEllipsisVerticalSharp className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:w-[150px]">
              <DropdownMenuItem>
                <Link
                  href={file.fileUrl as string}
                  className="flex group items-center gap-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  download={file.title}
                >
                  <CiFileOn className="h-6 w-6 group-hover:text-blue-500" />
                  <p className="group-hover:text-blue-500">Download</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex group items-center gap-5 ">
                  <CiStar className="h-6 w-6 group-hover:text-blue-500" />
                  <p className="group-hover:text-blue-500">Favorite</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex group items-center gap-5 ">
                  <CiTrash className="h-6 w-6 group-hover:text-rose-500" />
                  <p className="group-hover:text-rose-500">Delete</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          {file.type === "image" && (
            <Image
              src={file.fileUrl as string}
              alt="logo"
              width={200}
              height={200}
              className="object-cover h-[200px] w-[200px]"
            />
          )}

          {file.type === "pdf" && (
            <BsFiletypePdf className="h-[200px] w-[200px]" />
          )}
          {file.type === "docx" && (
            <BsFiletypeDocx className="h-[200px] w-[200px]" />
          )}
          {file.type === "csv" && (
            <BsFiletypeCsv className="h-[200px] w-[200px]" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={file.user.imageUrl as string} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[12px] font-semibold text-gray-500">
              {file.user.fullName}
            </p>
          </div>
          <p className="text-[12px] font-semibold text-gray-500">
            Uploaded on today at 4:30pm
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
