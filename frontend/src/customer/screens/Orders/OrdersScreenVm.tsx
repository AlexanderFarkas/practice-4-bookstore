import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { alertOnError, useVm } from "@/common/lib/utils.ts";
import { SchemaCustomerOrderDto } from "@/gen/schema";
import { api } from "@/api.ts";

export class OrdersScreenVm {
  constructor() {
    makeAutoObservable(this);
    this._refresh();
  }

  isLoading = false;
  orders: SchemaCustomerOrderDto[] = [];
  _refresh = async () => {
    try {
      this.isLoading = true;
      const { data } = await alertOnError(() => api.GET("/orders/"));
      this.orders = data!;
    } finally {
      this.isLoading = false;
    }
  };
  private _disposers = Array<() => void>();

  dispose = () => {
    this._disposers.forEach((d) => d());
  };
}

const ctx = React.createContext<OrdersScreenVm | null>(null);

export const OrdersScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const vm = useMemo(() => new OrdersScreenVm(), []);
  useEffect(() => () => vm.dispose(), [vm]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useOrdersScreenVm = () => useVm(ctx);
