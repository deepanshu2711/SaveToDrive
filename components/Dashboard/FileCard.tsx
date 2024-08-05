import { IoEllipsisVerticalSharp, IoImageOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const FileCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IoImageOutline className="h-5 w-5" />
            <p className="text-[24px font-semibold text-gray-700">File name</p>
          </div>
          <IoEllipsisVerticalSharp className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[12px] font-semibold text-gray-500">Deepanshu</p>
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
