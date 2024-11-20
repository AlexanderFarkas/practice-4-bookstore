import React from "react";
import { observer } from "mobx-react-lite";
import {
  AdminLoginScreenVmProvider,
  useAdminLoginScreenVm,
} from "./AdminLoginScreenVm";
import { useLoginScreenVm } from "@/customer/screens/Auth/LoginScreenVm.tsx";
import { TypographyH2 } from "@/common/components/typography.tsx";
import { Label } from "@/common/components/ui/label.tsx";
import { Input } from "@/common/components/ui/input.tsx";
import { Button, buttonVariants } from "@/common/components/ui/button.tsx";
import { Link } from "wouter";
import { PageRoot } from "@/components/PageRoot.tsx";

interface IProps {}

export const AdminLoginScreen: React.FC<IProps> = observer((props) => {
  return (
    <AdminLoginScreenVmProvider>
      <AdminLoginScreenImpl {...props} />
    </AdminLoginScreenVmProvider>
  );
});

const AdminLoginScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useAdminLoginScreenVm();
  return (
    <PageRoot className={"items-stretch justify-center"}>
      <TypographyH2 className={"mb-3"}>Авторизация</TypographyH2>
      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"password-field"}>Пароль</Label>
        <Input
          value={vm.password}
          onChange={(e) => (vm.password = e.target.value)}
          id={"password-field"}
          type={"password"}
          placeholder={"Введите Ваш пароль"}
        />
      </div>
      {vm.error != null && <Label className={"text-red-400"}>{vm.error}</Label>}
      <Button className={"mt-4"} onClick={vm.submit} type={"submit"}>
        Войти
      </Button>
    </PageRoot>
  );
});
