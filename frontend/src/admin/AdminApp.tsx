import { CustomerAuthStore } from "@/customer/screens/Stores/CustomerAuthStore.ts";
import React, { useMemo } from "react";
import { useVm } from "@/common/lib/utils.ts";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch } from "wouter";
import { AdminAuthStore } from "@/admin/Stores/AdminAuthStore.ts";
import { AdminLibraryScreen } from "@/admin/Screens/AdminLibrary/AdminLibraryScreen.tsx";
import { AdminLoginScreen } from "@/admin/Screens/AdminLogin/AdminLoginScreen.tsx";
import { AdminCreateUpdateBookScreen } from "@/admin/Screens/AdminCreateUpdateBook/AdminCreateUpdateBookScreen.tsx";
import { AdminOrdersScreen } from "@/admin/Screens/AdminOrders/AdminOrdersScreen.tsx";

type Stores = {
  authStore: AdminAuthStore;
};
const ctx = React.createContext<Stores | null>(null);
const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  const stores = useMemo(() => {
    return {
      authStore: new AdminAuthStore(),
    } satisfies Stores;
  }, []);

  return <ctx.Provider value={stores}>{children}</ctx.Provider>;
};
export const useAdminStores = () => useVm(ctx);
export const AdminApp = () => {
  return (
    <StoresProvider>
      <AppImpl />
    </StoresProvider>
  );
};

export const AppImpl = observer(() => {
  const authStore = useAdminStores().authStore;
  return (
    <Switch
      children={
        authStore.isLoggedIn
          ? [
              <Route path={"/orders"}>
                <AdminOrdersScreen />
              </Route>,
              <Route path={"/create_book"}>
                {() => <AdminCreateUpdateBookScreen bookId={null} />}
              </Route>,
              <Route path={"/edit_book/:book_id"}>
                {(params) => (
                  <AdminCreateUpdateBookScreen bookId={params.book_id} />
                )}
              </Route>,
              <Route path={"/"}>
                <AdminLibraryScreen />
              </Route>,
              <Route>
                <Redirect to={"/"} />
              </Route>,
            ]
          : [
              <Route path={"/login"}>
                <AdminLoginScreen />
              </Route>,
              <Route>
                <Redirect to={"/login"} />
              </Route>,
            ]
      }
    />
  );
});
