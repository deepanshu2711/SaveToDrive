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
import { useToast } from "@/components/ui/use-toast";
import { handleGoogleAuth } from "@/lib/auth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch } from "@/redux/hook";
import { setCurrentUser } from "@/redux/reducers/userReducer";

export default function SigIn() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleGoogleSignIn = async () => {
    const result = await handleGoogleAuth();

    if (result.success) {
      try {
        const responce = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/google`,
          {
            email: result.user?.email,
            fullName: result.user?.displayName,
            imageUrl: result.user?.photoURL,
          },
          { withCredentials: true }
        );

        if (responce.status === 201) {
          router.push("/dashboard");
          toast({
            title: "Sign in successful",
            description: "Welcome back! to SaveToDrive",
            variant: "success",
          });
          dispatch(setCurrentUser(responce.data));
        } else if (responce.status === 200) {
          toast({
            title: responce.data,
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: result.errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const responce = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (responce.status === 201) {
        router.push("/dashboard");
        toast({
          title: "Sign in successful",
          description: "Welcome back! to SaveToDrive",
          variant: "success",
        });

        dispatch(setCurrentUser(responce.data));
      }

      if (responce.status === 200)
        toast({
          title: responce.data,
        });

      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="">
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
                  src={"/newGoogle.png"}
                  height={30}
                  width={30}
                  alt="google"
                />
              </span>
              Continue with google{" "}
              <span>
                <BiSolidRightArrow className="h-2.5 w-2.5" />
              </span>
            </Button>
            <Separator />
            <div className="my-10 flex flex-col gap-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <Button onClick={handleSignIn} className="w-full">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "SIGN IN"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <p className="text-[14px] text-gray-400">No account?</p>
            <Link
              href={"/signup"}
              className="text-[14px] hover:underline font-bold"
            >
              sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
