import React from "react";
import { observer } from "mobx-react-lite";
import {
  AdminLibraryScreenVmProvider,
  useAdminLibraryScreenVm,
} from "./AdminLibraryScreenVm";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { LibraryFilters } from "@/common/lib/LibraryFilters.tsx";
import { LoadingSpinner } from "@/common/components/ui/spinner.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { useLocation } from "wouter";
import { PlusIcon } from "@radix-ui/react-icons";
import { AdminPageRoot } from "@/admin/AdminPageRoot.tsx";

interface IProps {}

export const AdminLibraryScreen: React.FC<IProps> = observer((props) => {
  return (
    <AdminLibraryScreenVmProvider>
      <AdminLibraryScreenImpl {...props} />
    </AdminLibraryScreenVmProvider>
  );
});

const AdminLibraryScreenImpl: React.FC<IProps> = observer((props) => {
  const vm = useAdminLibraryScreenVm();
  const [, navigate] = useLocation();
  return (
    <AdminPageRoot>
      <div className={"flex flex-row gap-2 items-end"}>
        <LibraryFilters vm={vm.filtersVm} />
        <Button
          className={"aspect-square"}
          variant={"outline"}
          onClick={() => navigate("/create_book")}
        >
          <PlusIcon />
        </Button>
      </div>
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
            <TableRow
              key={book.id}
              className={"cursor-pointer"}
              onClick={() => navigate(`/edit_book/${book.id}`)}
            >
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.year_published}</TableCell>
            </TableRow>
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
    </AdminPageRoot>
  );
});
