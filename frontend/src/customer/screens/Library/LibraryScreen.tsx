import React from "react";
import { observer } from "mobx-react-lite";
import { LibraryScreenVmProvider, useLibraryScreenVm } from "./LibraryScreenVm";
import { CustomerPageRoot } from "@/customer/CustomerPageRoot.tsx";
import { LibraryFilters } from "@/common/lib/LibraryFilters.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { PlusIcon } from "@radix-ui/react-icons";
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
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog.tsx";

interface IProps {}

export const LibraryScreen: React.FC<IProps> = observer((props) => {
  return (
    <LibraryScreenVmProvider>
      <LibraryScreenImpl {...props} />
    </LibraryScreenVmProvider>
  );
});

const LibraryScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useLibraryScreenVm();
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
            <TableHead>Название</TableHead>
            <TableHead>Автор</TableHead>
            <TableHead>Окончание аренды</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vm.bookInstances.map(({ book, expiration_date }) => (
            <Dialog>
              <DialogTrigger asChild>
                <TableRow key={book.id} className={"cursor-pointer"}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    {expiration_date != null
                      ? dayjs(expiration_date).format("d MMM, YYYY")
                      : "-"}
                  </TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{book.title}</DialogTitle>
                </DialogHeader>
                <div>{book.text}</div>
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
        {vm.bookInstances.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell className={"text-center"} colSpan={3}>
                Купленные книги не найдены
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </CustomerPageRoot>
  );
});
