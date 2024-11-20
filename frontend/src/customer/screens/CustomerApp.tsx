import { Redirect, Route, Switch } from "wouter";
import { LoginScreen } from "./Auth/LoginScreen.tsx";
import { RegisterScreen } from "./Auth/RegisterScreen.tsx";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { useVm } from "@/common/lib/utils.ts";
import { CustomerAuthStore } from "@/customer/screens/Stores/CustomerAuthStore.ts";
import { LibraryScreen } from "@/customer/screens/Library/LibraryScreen.tsx";
import { StoreScreen } from "@/customer/screens/Store/StoreScreen.tsx";
import { OrdersScreen } from "@/customer/screens/Orders/OrdersScreen.tsx";

type Stores = {
  authStore: CustomerAuthStore;
};
const ctx = React.createContext<Stores | null>(null);
const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  const stores = useMemo(() => {
    return {
      authStore: new CustomerAuthStore(),
    } satisfies Stores;
  }, []);

  return <ctx.Provider value={stores}>{children}</ctx.Provider>;
};
export const useCustomerStores = () => useVm(ctx);
export const CustomerApp = () => {
  return (
    <StoresProvider>
      <AppImpl />
    </StoresProvider>
  );
};

const AppImpl = observer(() => {
  const authStore = useCustomerStores().authStore;
  if (authStore.isLoadingCustomer) {
    return (
      <div className={"flex items-center justify-center w-full h-full"}>
        Загрузка...
      </div>
    );
  }
  return (
    <Switch
      children={
        authStore.isLoggedIn
          ? [
              <Route path={"/"}>
                <StoreScreen />
              </Route>,
              <Route path={"/my_books"}>
                <LibraryScreen />
              </Route>,
              <Route path={"/orders"}>
                <OrdersScreen />
              </Route>,
              <Route>
                <Redirect to={"/"} />
              </Route>,
            ]
          : [
              <Route path={"/login"}>
                <LoginScreen />
              </Route>,
              <Route path={"/register"}>
                <RegisterScreen />
              </Route>,
              <Route>
                <Redirect to={"/login"} />
              </Route>,
            ]
      }
    />
  );
});
