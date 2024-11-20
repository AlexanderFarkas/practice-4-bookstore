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

export class AdminAuthStore {
  static ADMIN_ACCESS_TOKEN = "adminAccessToken";
  constructor() {
    makeAutoObservable(this);
    this.setAccessToken(
      localStorage.getItem(AdminAuthStore.ADMIN_ACCESS_TOKEN),
    );
    api.onAdminUnauthorized = () => {
      this.setAccessToken(null);
    };
  }

  _accessToken: string | null = null;
  setAccessToken(token: string | null) {
    if (token == this._accessToken) return;
    this._accessToken = token;
    if (token == null) {
      localStorage.removeItem(AdminAuthStore.ADMIN_ACCESS_TOKEN);
    } else {
      localStorage.setItem(AdminAuthStore.ADMIN_ACCESS_TOKEN, token);
    }
  }

  get isLoggedIn() {
    return this._accessToken != null;
  }

  login = async (dto: SchemaLoginAdminDto) => {
    const { data } = await api.POST("/admin/auth/login", {
      body: dto,
    });
    this.setAccessToken(data!.token);
  };
}
