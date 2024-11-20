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
import { useVm } from "@/common/lib/utils.ts";
import { LibraryFiltersVm } from "@/common/lib/LibraryFiltersVm.tsx";
import { SchemaCustomerBookDto } from "@/gen/schema";
import { api } from "@/api.ts";
import debounce from "debounce";

export class StoreScreenVm {
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
  books: SchemaCustomerBookDto[] = [];
  private _disposers = Array<() => void>();

  private _refresh = async () => {
    try {
      this.isLoading = true;
      this.books = (
        await api.GET("/books/", {
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

const ctx = React.createContext<StoreScreenVm | null>(null);

export const StoreScreenVmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const vm = useMemo(() => new StoreScreenVm(), []);
  useEffect(() => () => vm.dispose(), [vm]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useStoreScreenVm = () => useVm(ctx);
