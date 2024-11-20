import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useRoute } from "wouter";
import { cn } from "@/common/lib/utils.ts";
import { PageRoot } from "@/components/PageRoot.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { useCustomerStores } from "@/customer/screens/CustomerApp.tsx";
import { ExpiresSoonList } from "@/customer/screens/ExpiresSoonList.tsx";

export const CustomerPageRoot = observer(
  ({ children }: { children: React.ReactNode }) => {
    const authStore = useCustomerStores().authStore;
    return (
      <PageRoot className={"!w-[600px] flex flex-col"}>
        <nav
          className={
            "flex flex-row px-4 gap-3 items-center  h-[80px] border-gray-900 border-solid border-[2px] rounded-sm"
          }
        >
          <NavLink to={"/"}>Магазин</NavLink>
          <NavLink to={"/my_books"}>Мои книги</NavLink>
          <NavLink to={"/orders"}>Заказы</NavLink>
          <div className={"flex-1 flex flex-row justify-end"}>
            <Button onClick={authStore.logout}>Выйти</Button>
          </div>
        </nav>
        <ExpiresSoonList />
        {children}
      </PageRoot>
    );
  },
);

const NavLink = (props: { to: string; children: React.ReactNode }) => {
  const [match] = useRoute(props.to);
  console.log(match);
  return (
    <Link
      className={cn(match && "border-b-[1px] border-solid border-purple-500 ")}
      to={props.to}
    >
      {props.children}
    </Link>
  );
};
