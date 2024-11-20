import React from "react";
import { observer } from "mobx-react-lite";
import {
  AdminOrdersScreenVmProvider,
  useAdminOrdersScreenVm,
} from "./AdminOrdersScreenVm";
import { AdminPageRoot } from "@/admin/AdminPageRoot.tsx";
import { LoadingSpinner } from "@/common/components/ui/spinner.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/common/components/ui/button.tsx";

interface IProps {}

export const AdminOrdersScreen: React.FC<IProps> = observer((props) => {
  return (
    <AdminOrdersScreenVmProvider>
      <AdminOrdersScreenImpl {...props} />
    </AdminOrdersScreenVmProvider>
  );
});

const AdminOrdersScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useAdminOrdersScreenVm();
  return (
    <AdminPageRoot>
      <Table className={"relative"}>
        {vm.isLoading && (
          <div className={"absolute flex w-full items-center justify-center"}>
            <LoadingSpinner />
          </div>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Покупатель</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vm.incompleteOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.book.title}</TableCell>
              <TableCell>{order.customer.username}</TableCell>
              <TableCell className={"flex flex-row justify-end"}>
                <Button
                  disabled={vm.isCompleting}
                  onClick={() => vm.completeOrder(order.id)}
                >
                  Отметить оплаченным
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {vm.incompleteOrders.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell className={"text-center"} colSpan={3}>
                Заказы не найдены
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </AdminPageRoot>
  );
});
