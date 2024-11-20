import { ExitIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useLocation, useRoute } from "wouter";
import { useCustomerStores } from "@/customer/screens/CustomerApp.tsx";
import { Button } from "@/common/components/ui/button.tsx";

export const PageHeader = ({ children }: { children?: React.ReactNode }) => {
  const [_, navigate] = useLocation();
  const authStore = useCustomerStores().authStore;
  const [match] = useRoute("/feed");
  return (
    <div className={"flex flex-row justify-between items-center w-full gap-2"}>
      {!match && (
        <Button variant={"outline"} onClick={() => navigate("/")}>
          <HomeIcon />
        </Button>
      )}
      {children}
      <Button variant={"outline"} onClick={authStore.logout}>
        <ExitIcon />
      </Button>
    </div>
  );
};
