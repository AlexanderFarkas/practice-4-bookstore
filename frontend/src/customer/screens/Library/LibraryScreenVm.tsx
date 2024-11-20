import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { useCustomerStores } from "@/customer/screens/CustomerApp.tsx";
import { useVm } from "@/common/lib/utils.ts";
import { SchemaBookInstanceDto } from "@/gen/schema";
import { api } from "@/api.ts";

export class LibraryScreenVm {
  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  bookInstances = Array<SchemaBookInstanceDto>();
  isLoading = true;
  private _init = async () => {
    try {
      this.isLoading = true;
      const { data } = await api.GET("/books/my_library");
      this.bookInstances = data!;
    } finally {
      this.isLoading = false;
    }
  };
  private _disposers = Array<() => void>();

  dispose = () => {
    this._disposers.forEach((d) => d());
  };
}

const ctx = React.createContext<LibraryScreenVm | null>(null);

export const LibraryScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {} = useCustomerStores();
  const vm = useMemo(() => new LibraryScreenVm(), []);
  useEffect(() => () => vm.dispose(), [vm]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useLibraryScreenVm = () => useVm(ctx);
