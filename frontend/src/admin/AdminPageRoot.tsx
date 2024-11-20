import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useRoute } from "wouter";
import { cn } from "@/common/lib/utils.ts";
import { PageRoot } from "@/components/PageRoot.tsx";

export const AdminPageRoot = observer(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <PageRoot className={"!w-[600px] flex flex-col"}>
        <nav
          className={
            "flex flex-row px-4 gap-3 items-center  h-[80px] border-gray-900 border-solid border-[2px] rounded-sm"
          }
        >
          <NavLink to={"/"}>Библиотека</NavLink>
          <NavLink to={"/orders"}>Новые Заказы</NavLink>
        </nav>
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
