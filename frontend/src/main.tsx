import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import { Route, Router, Switch } from "wouter";
import { CustomerApp } from "@/customer/screens/CustomerApp.tsx";
import { AdminApp } from "@/admin/AdminApp.tsx";
import { configure } from "mobx";
import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
dayjs.locale(ru);
configure({
  enforceActions: "never",
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <Switch>
      <Route path={"/admin"} nest={true}>
        <AdminApp />
      </Route>
      <Route path={"/"} nest={true}>
        <CustomerApp />
      </Route>
    </Switch>
  </Router>,
);
