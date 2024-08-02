"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";

export default function SigUp() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:min-w-[400px] w-full">
            <Button
              variant={"outline"}
              className="w-full flex mb-8 font-semibold items-center justify-around"
            >
              <span>
                {/* <BsGoogle className="h-5 w-5" /> */}
                <Image
                  src={"/google.png"}
                  height={30}
                  width={30}
                  alt="google"
                />
              </span>
              Continue with google{" "}
              <span>
                <BiSolidRightArrow className="h-5 w-5" />
              </span>
            </Button>
            <Separator />
            <div className="my-8 flex flex-col gap-4">
              <Input
                ref={imageRef}
                type="file"
                accept="image/*"
                placeholder="Profile Image"
                className="hidden"
                onChange={handleFileChange}
              />
              {imagePreview ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt="profile image"
                    width={128}
                    height={128}
                    className="rounded-full h-[120px] w-[120px] object-cover"
                  />
                </div>
              ) : (
                <div
                  onClick={handleClick}
                  className="h-32 border cursor-pointer flex flex-col items-center justify-center"
                >
                  <FaImage className="h-20 w-20" />
                  <p className="text-[14px] text-gray-600 font-medium">
                    Select profile image
                  </p>
                </div>
              )}

              <Input type="email" placeholder="Email" />
              <Input type="text" placeholder="Name" />
              <Input type="password" placeholder="Password" />
            </div>
            <Button className="w-full">SIGN UP</Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <p className="text-[14px] text-gray-400">Have account?</p>
            <Link href={"/signin"} className="text-[14px] font-bold">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
