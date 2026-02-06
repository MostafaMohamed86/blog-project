"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {

  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-5 left-5">
        <button
          onClick={handleGoBack}
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft className="size-4 mr-2" />
          Go Back
        </button>
      </div>
      <div className="w-full max-w-md mx-auto">{children}</div>
    </div>
  );
}
