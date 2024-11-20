import React from "react";
import { observer } from "mobx-react-lite";
import { OrdersScreenVmProvider, useOrdersScreenVm } from "./OrdersScreenVm";
import { CustomerPageRoot } from "@/customer/CustomerPageRoot.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { LoadingSpinner } from "@/common/components/ui/spinner.tsx";

interface IProps {}

export const OrdersScreen: React.FC<IProps> = observer((props) => {
  return (
    <OrdersScreenVmProvider>
      <OrdersScreenImpl {...props} />
    </OrdersScreenVmProvider>
  );
});

const OrdersScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useOrdersScreenVm();
  return (
    <CustomerPageRoot>
      <Table className={"relative"}>
        {vm.isLoading && (
          <div className={"absolute flex w-full items-center justify-center"}>
            <LoadingSpinner />
          </div>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Номер заказа</TableHead>
            <TableHead>Книга</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vm.orders.map((order) => (
            <TableRow key={order.id} className={"cursor-pointer"}>
              <TableCell className="font-medium">
                {order.id.slice(0, 8)}
              </TableCell>
              <TableCell>{order.book.title}</TableCell>
              <TableCell>
                {order.status === "awaiting_payment"
                  ? "Ожидает подтверждения оплаты"
                  : order.status === "cancelled"
                    ? "Отменен"
                    : "Исполнен"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {vm.orders.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell className={"text-center"} colSpan={3}>
                Заказы не найдены
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </CustomerPageRoot>
  );
});
