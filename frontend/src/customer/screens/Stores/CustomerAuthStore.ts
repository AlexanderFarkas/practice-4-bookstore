import { makeAutoObservable } from "mobx";
import { useVm } from "@/common/lib/utils.ts";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "@/api.ts";
import {
  SchemaCustomerDto,
  SchemaLoginAdminDto,
  SchemaLoginCustomerDto,
} from "@/gen/schema";

export class CustomerAuthStore {
  static CUSTOMER_ACCESS_TOKEN = "accessToken";
  static ADMIN_ACCESS_TOKEN = "adminAccessToken";
  constructor() {
    makeAutoObservable(this);
    this.setAccessToken(
      localStorage.getItem(CustomerAuthStore.CUSTOMER_ACCESS_TOKEN),
    );
    api.onCustomerUnauthorized = () => {
      this.setAccessToken(null);
    };
  }

  _accessToken: string | null = null;
  setAccessToken(token: string | null) {
    if (token == this._accessToken) return;
    this._accessToken = token;
    if (token == null) {
      localStorage.removeItem(CustomerAuthStore.CUSTOMER_ACCESS_TOKEN);
    } else {
      localStorage.setItem(CustomerAuthStore.CUSTOMER_ACCESS_TOKEN, token);
    }
    this._refreshCustomer();
  }

  get isLoggedIn() {
    return this._accessToken != null;
  }

  get userId() {
    if (!this._accessToken) {
      return null;
    }
    const decoded = jwtDecode<{
      user_id: string;
    }>(this._accessToken);
    return decoded.user_id;
  }

  login = async (dto: SchemaLoginCustomerDto) => {
    const { data } = await api.POST("/auth/login", {
      body: dto,
    });
    this.setAccessToken(data!.token);
  };

  logout = () => {
    this.setAccessToken(null);
  };

  register = async (dto: SchemaLoginCustomerDto) => {
    const { data } = await api.POST("/auth/register", {
      body: dto,
    });
    this.setAccessToken(data!.token);
  };

  customer: SchemaCustomerDto | null = null;
  isLoadingCustomer = false;
  _refreshCustomer = async () => {
    if (!this._accessToken) {
      this.customer = null;
    }
    this.isLoadingCustomer = true;
    try {
      const { data } = await api.GET("/auth/me");
      this.customer = data!;
    } finally {
      this.isLoadingCustomer = false;
    }
  };
}
