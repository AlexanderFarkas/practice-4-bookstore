import React, { Suspense } from "react";
import { cn } from "@/common/lib/utils.ts";
import { LoadingSpinner } from "@/common/components/ui/spinner.tsx";

export const PageRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-[320px] mx-auto flex flex-col py-8 h-full items-stretch justify-start gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
