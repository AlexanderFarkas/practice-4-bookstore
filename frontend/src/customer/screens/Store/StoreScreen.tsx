import React from "react";
import { observer } from "mobx-react-lite";
import { StoreScreenVmProvider, useStoreScreenVm } from "./StoreScreenVm";
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
import { PurchaseBookDialogTrigger } from "@/customer/screens/Store/PurchaseBookDialogTrigger.tsx";

interface IProps {}

export const StoreScreen: React.FC<IProps> = observer((props) => {
  return (
    <StoreScreenVmProvider>
      <StoreScreenImpl {...props} />
    </StoreScreenVmProvider>
  );
});

const StoreScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useStoreScreenVm();
  return (
    <CustomerPageRoot>
      <LibraryFilters vm={vm.filtersVm} />

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
            <TableHead>Категория</TableHead>
            <TableHead>Дата публикации</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vm.books.map((book) => (
            <PurchaseBookDialogTrigger book={book}>
              <TableRow key={book.id} className={"cursor-pointer"}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.year_published}</TableCell>
              </TableRow>
            </PurchaseBookDialogTrigger>
          ))}
        </TableBody>
        {vm.books.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell className={"text-center"} colSpan={4}>
                Книги не найдены
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </CustomerPageRoot>
  );
});
