import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { alertOnError, useVm } from "@/common/lib/utils.ts";
import { ApiError } from "@/api.ts";
import { CustomerAuthStore } from "@/customer/screens/Stores/CustomerAuthStore.ts";
import { useCustomerStores } from "@/customer/screens/CustomerApp.tsx";

export class RegisterScreenVm {
  constructor(private authStore: CustomerAuthStore) {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;
  username: string = "";
  password: string = "";
  repeatPassword: string = "";

  wasSubmitted: boolean = false;

  get error(): string | null {
    if (!this.wasSubmitted) {
      return null;
    }
    if (this.username.length === 0) {
      return "Никнейм обязателен";
    }
    if (this.password.length === 0) {
      return "Пароль обязателен";
    }
    if (this.password !== this.repeatPassword) {
      return "Пароли должны совпадать";
    }

    return null;
  }

  submit = async () => {
    this.wasSubmitted = true;
    if (this.error) {
      return;
    }
    this.isLoading = true;
    try {
      await alertOnError(() =>
        this.authStore.register({
          username: this.username,
          password: this.password,
        }),
      );
    } finally {
      this.isLoading = false;
    }
  };
}

const ctx = React.createContext<RegisterScreenVm | null>(null);

export const RegisterScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { authStore } = useCustomerStores();
  const vm = useMemo(() => new RegisterScreenVm(authStore), []);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useRegisterScreenVm = () => useVm(ctx);
