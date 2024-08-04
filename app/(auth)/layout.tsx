import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
      <div>
        <Toaster />
      </div>
    </div>
  );
}
