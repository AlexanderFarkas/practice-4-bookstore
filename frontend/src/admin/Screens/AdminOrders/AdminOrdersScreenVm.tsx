import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { alertOnError, useVm } from "@/common/lib/utils.ts";
import { SchemaAdminOrderDto } from "@/gen/schema";
import { api } from "@/api.ts";

export class AdminOrdersScreenVm {
  constructor() {
    makeAutoObservable(this);
    this._refresh();
  }

  incompleteOrders = Array<SchemaAdminOrderDto>();
  isLoading = false;
  isCompleting = false;

  private _refresh = async () => {
    this.isLoading = true;
    try {
      const { data } = await api.GET("/admin/orders/");
      this.incompleteOrders = data!;
    } finally {
      this.isLoading = false;
    }
  };

  completeOrder = async (orderId: string) => {
    try {
      this.isCompleting = true;
      await alertOnError(() =>
        api.POST("/admin/orders/{order_id}/complete", {
          params: {
            path: {
              order_id: orderId,
            },
          },
        }),
      );
      this._refresh();
    } finally {
      this.isCompleting = false;
    }
  };

  private _disposers = Array<() => void>();

  dispose = () => {
    this._disposers.forEach((d) => d());
  };
}

const ctx = React.createContext<AdminOrdersScreenVm | null>(null);

export const AdminOrdersScreenVmProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const vm = useMemo(() => new AdminOrdersScreenVm(), []);
  useEffect(() => () => vm.dispose(), [vm]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useAdminOrdersScreenVm = () => useVm(ctx);
