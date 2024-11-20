import { observer } from "mobx-react-lite";
import { LibraryFiltersVm } from "@/common/lib/LibraryFiltersVm.tsx";
import { Input } from "@/common/components/ui/input.tsx";
import { Label } from "@/common/components/ui/label.tsx";
import React from "react";
import { useAdminLibraryScreenVm } from "@/admin/Screens/AdminLibrary/AdminLibraryScreenVm.tsx";
import { clamp } from "@/common/lib/utils.ts";

export const LibraryFilters = observer(({ vm }: { vm: LibraryFiltersVm }) => {
  return (
    <div className={"flex flex-row gap-2"}>
      <LibraryFilterItem
        label={"Автор"}
        value={vm.author}
        onChange={(e) => (vm.author = e.target.value)}
      />
      <LibraryFilterItem
        label={"Категория"}
        value={vm.category}
        onChange={(e) => (vm.category = e.target.value)}
      />
      <LibraryFilterItem
        label={"Год"}
        value={vm.yearPublished ? vm.yearPublished.toString() : ""}
        onChange={(e) => {
          const parsed = parseInt(e.target.value);
          return (vm.yearPublished = isNaN(parsed)
            ? undefined
            : clamp(parsed, 0, 2024));
        }}
      />
    </div>
  );
});

const LibraryFilterItem: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = observer(({ label, value, onChange }) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} />
    </div>
  );
});
