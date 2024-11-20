import { Link } from "wouter";

import React from "react";
import { observer } from "mobx-react-lite";
import { LoginScreenVmProvider, useLoginScreenVm } from "./LoginScreenVm";
import { TypographyH2 } from "@/common/components/typography.tsx";
import { Label } from "@/common/components/ui/label.tsx";
import { Input } from "@/common/components/ui/input.tsx";
import { Button, buttonVariants } from "@/common/components/ui/button.tsx";
import { PageRoot } from "@/components/PageRoot.tsx";

interface IProps {}

export const LoginScreen: React.FC<IProps> = observer((props) => {
  return (
    <LoginScreenVmProvider>
      <LoginScreenImpl {...props} />
    </LoginScreenVmProvider>
  );
});

const LoginScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useLoginScreenVm();
  return (
    <PageRoot className={"items-stretch justify-center"}>
      <TypographyH2 className={"mb-3"}>Авторизация</TypographyH2>
      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"username-field"}>Никнейм</Label>
        <Input
          value={vm.username}
          onChange={(e) => (vm.username = e.target.value)}
          type={"email"}
          id={"username-field"}
          placeholder={"Введите Ваш никнейм"}
        />
      </div>
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
      <div className={"flex flex-col mt-4 gap-2"}>
        <Button onClick={vm.submit} type={"submit"}>
          Войти
        </Button>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={"/register"}
        >
          К Регистрации
        </Link>
      </div>
    </PageRoot>
  );
});
