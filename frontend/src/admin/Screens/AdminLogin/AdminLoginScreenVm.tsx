import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { useAdminStores } from "@/admin/AdminApp.tsx";
import { alertOnError, useVm } from "@/common/lib/utils.ts";
import { CustomerAuthStore } from "@/customer/screens/Stores/CustomerAuthStore.ts";
import { ApiError } from "@/api.ts";
import { AdminAuthStore } from "@/admin/Stores/AdminAuthStore.ts";

export class AdminLoginScreenVm {
  constructor(private authStore: AdminAuthStore) {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;
  password: string = "";

  wasSubmitted: boolean = false;

  get error(): string | null {
    if (!this.wasSubmitted) {
      return null;
    }
    if (this.password.length === 0) {
      return "Пароль обязателен";
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
        this.authStore.login({
          password: this.password,
        }),
      );
    } finally {
      this.isLoading = false;
    }
  };
}

const ctx = React.createContext<AdminLoginScreenVm | null>(null);

export const AdminLoginScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { authStore } = useAdminStores();
  const vm = useMemo(() => new AdminLoginScreenVm(authStore), []);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useAdminLoginScreenVm = () => useVm(ctx);
