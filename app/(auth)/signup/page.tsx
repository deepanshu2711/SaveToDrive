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
import { handleImageUpload } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setCurrentUser } from "@/redux/reducers/userReducer";

export default function SigUp() {
  const { toast } = useToast();
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileuploadLoading, setFileuploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useAppDispatch();

  const handleGoogleSignUp = async () => {
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
          toast({
            title: "Sign in successful",
            description: "Welcome back! to SaveToDrive",
            variant: "success",
          });
          dispatch(setCurrentUser(responce.data));
          router.push("/dashboard");
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

  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Please select a valid image file.",
          variant: "default",
        });
        return;
      }
      setFileuploadLoading(true);
      const result = await handleImageUpload(file);
      if (result.success) {
        setImagePreview(result.downloadUrl as string);
        setFileuploadLoading(false);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        setFileuploadLoading(false);
      }
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const responce = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        {
          email,
          password,
          fullName,
          imageUrl: imagePreview,
        },
        { withCredentials: true }
      );

      if (responce.status === 201) {
        toast({
          title: "Account created",
          description: "We've created your account for you.",
          variant: "success",
        });
        dispatch(setCurrentUser(responce.data));
        router.push("/dashboard");
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
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:min-w-[400px] w-full">
            <Button
              onClick={handleGoogleSignUp}
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
                <BiSolidRightArrow className="h-2.5 w-2.5" />
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
              {fileuploadLoading ? (
                <div className="flex flex-col items-center justify-center">
                  <AiOutlineLoading3Quarters className="self-center h-[80px] w-[80px] m-6 animate-spin " />
                  <p className="text-gray-500 text-[14px] font-semibold">
                    Please wait a moment
                  </p>
                </div>
              ) : imagePreview ? (
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
                  className="h-32 group border cursor-pointer flex flex-col items-center justify-center"
                >
                  <FaImage className="h-20 w-20 text-gray-700 group-hover:text-gray-900" />
                  <p className="text-[14px] text-gray-600 font-medium">
                    Select profile image
                  </p>
                </div>
              )}

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <Button onClick={handleSignUp} className="w-full">
              {loading ? (
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <p className="text-[14px] text-gray-400">Have account?</p>
            <Link
              href={"/signin"}
              className="text-[14px] font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
