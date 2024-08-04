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
import { handleGoogleAuth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { BiSolidRightArrow } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";

export default function SigIn() {
  const handleGoogleSignIn = () => {
    const result = handleGoogleAuth();
  };

  return (
    <div>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:min-w-[400px] w-full">
            <Button
              onClick={handleGoogleSignIn}
              variant={"outline"}
              className="w-full flex mb-10 font-semibold items-center justify-around"
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
            <div className="my-10 flex flex-col gap-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </div>
            <Button className="w-full">SIGN IN</Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <p className="text-[14px] text-gray-400">No account?</p>
            <Link
              href={"/signup"}
              className="text-[14px] hover:underline font-bold"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
