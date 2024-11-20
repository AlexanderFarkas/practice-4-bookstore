import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
  reaction,
  toJS,
} from "mobx";
import { useAdminStores } from "@/admin/AdminApp.tsx";
import { useVm } from "@/common/lib/utils.ts";
import { SchemaAdminBookDto } from "@/gen/schema";
import { api } from "@/api.ts";
import { LibraryFiltersVm } from "@/common/lib/LibraryFiltersVm.tsx";
import debounce from "debounce";
import { useLocation } from "wouter";
import { observer } from "mobx-react-lite";

export class AdminLibraryScreenVm {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._refresh();

    this._disposers.push(
      reaction(
        () => {
          console.log(this._disposers);
          return toJS(this.filtersVm.params);
        },
        () => this._debouncedRefresh(),
      ),
    );
  }

  filtersVm = new LibraryFiltersVm();

  isLoading = true;
  books: SchemaAdminBookDto[] = [];
  private _disposers = Array<() => void>();

  private _refresh = async () => {
    try {
      this.isLoading = true;
      this.books = (
        await api.GET("/admin/books/", {
          params: {
            query: this.filtersVm.params,
          },
        })
      ).data!;
    } finally {
      this.isLoading = false;
    }
  };

  private _debouncedRefresh = debounce(this._refresh, 400);

  dispose = () => {
    this._disposers.forEach((d) => d());
  };
}

const ctx = React.createContext<AdminLibraryScreenVm | null>(null);

export const AdminLibraryScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = observer(({ children }) => {
  const vm = useMemo(() => new AdminLibraryScreenVm(), []);
  useEffect(() => {
    return () => vm.dispose();
  }, [vm.dispose]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
});

export const useAdminLibraryScreenVm = () => useVm(ctx);
