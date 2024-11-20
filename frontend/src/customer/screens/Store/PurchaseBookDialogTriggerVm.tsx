import React, { useMemo, useEffect } from "react";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { alertOnError, useVm } from "@/common/lib/utils.ts";
import { api } from "@/api.ts";
import { SchemaCustomerBookDto, SchemaPurchaseType } from "@/gen/schema";

export class PurchaseBookDialogTriggerVm {
  constructor(private book: SchemaCustomerBookDto) {
    makeAutoObservable(this);
    this._init();
  }

  private _disposers = Array<() => void>();
  isLoading = true;
  hasActiveInstance = false;
  purchaseType: SchemaPurchaseType = "forever";
  isSubmitting = false;

  _init = async () => {
    try {
      const { data } = await api.GET("/books/{book_id}/active_instance", {
        params: {
          path: { book_id: this.book.id },
        },
      });

      this.hasActiveInstance = data != null;
    } finally {
      this.isLoading = false;
    }
  };

  submit = async () => {
    this.isSubmitting = true;
    try {
      await alertOnError(() =>
        api.POST("/books/{book_id}/purchase", {
          params: {
            path: {
              book_id: this.book.id,
            },
          },

          body: {
            purchase_type: this.purchaseType,
          },
        }),
      );
    } finally {
      this.isSubmitting = false;
    }
  };
  dispose = () => {
    this._disposers.forEach((d) => d());
  };
}

const ctx = React.createContext<PurchaseBookDialogTriggerVm | null>(null);

export type PurchaseBookDialogTriggerVmProps = {
  book: SchemaCustomerBookDto;
  children: React.ReactNode;
};
export const PurchaseBookDialogTriggerVmProvider: React.FC<
  PurchaseBookDialogTriggerVmProps
> = ({ children, book }) => {
  const vm = useMemo(() => new PurchaseBookDialogTriggerVm(book), [book]);
  useEffect(() => () => vm.dispose(), [vm]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const usePurchaseBookDialogTriggerVm = () => useVm(ctx);
