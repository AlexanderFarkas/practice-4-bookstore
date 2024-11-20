import React, { useEffect, useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { SchemaCreateBookDto } from "@/gen/schema";
import { api, ApiError } from "@/api.ts";
import { useParams } from "wouter";
import { alertOnError, useVm } from "@/common/lib/utils.ts";

export class AdminCreateUpdateBookScreenVm {
  constructor(public bookId: string | null) {
    makeAutoObservable(this);
    this._init();
  }

  isLoading: boolean = false;
  isSubmitting: boolean = false;
  book: SchemaCreateBookDto = {
    title: "",
    author: "",
    category: "",
    purchase_price: 0,
    two_weeks_rent_price: 0,
    month_rent_price: 0,
    three_month_rent_price: 0,
    year_published: 0,
    text: "",
    is_hidden: false,
  };

  private async _init() {
    if (this.bookId) {
      this.isLoading = true;
      try {
        this.book = (
          await api.GET(`/admin/books/{book_id}`, {
            params: {
              path: { book_id: this.bookId },
            },
          })
        ).data!;
      } finally {
        this.isLoading = false;
      }
    }
  }

  async submit() {
    this.isSubmitting = true;
    try {
      await alertOnError(async () => {
        if (this.bookId != null) {
          await api.PUT(`/admin/books/{book_id}`, {
            params: {
              path: { book_id: this.bookId },
            },
            body: this.book,
          });
        } else {
          await api.POST("/admin/books/", { body: this.book });
        }
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  setBookDetails(details: Partial<SchemaCreateBookDto>) {
    this.book = { ...this.book, ...details };
  }
}

const ctx = React.createContext<AdminCreateUpdateBookScreenVm | null>(null);

export const AdminCreateUpdateBookScreenVmProvider: React.FC<{
  children: React.ReactNode;
  bookId: string | null;
}> = ({ children, bookId }) => {
  const vm = useMemo(() => new AdminCreateUpdateBookScreenVm(bookId), [bookId]);
  return <ctx.Provider value={vm}>{children}</ctx.Provider>;
};

export const useAdminCreateUpdateBookScreenVm = () => useVm(ctx);
