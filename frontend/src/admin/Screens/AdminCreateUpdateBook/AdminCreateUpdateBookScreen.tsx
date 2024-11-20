import React from "react";
import { observer } from "mobx-react-lite";
import { useAdminCreateUpdateBookScreenVm } from "./AdminCreateUpdateBookScreenVm";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";

import { AdminCreateUpdateBookScreenVmProvider } from "./AdminCreateUpdateBookScreenVm";
import { PageRoot } from "@/customer/screens/PageRoot.tsx";
import { Textarea } from "@/common/components/ui/textarea.tsx";
import { clamp } from "@/common/lib/utils.ts";
import { Button } from "@/common/components/ui/button.tsx";
import { useLocation } from "wouter";
import { AdminPageRoot } from "@/admin/AdminPageRoot.tsx";

export const AdminCreateUpdateBookScreen: React.FC<{ bookId: string | null }> =
  observer((props) => {
    return (
      <AdminCreateUpdateBookScreenVmProvider bookId={props.bookId}>
        <AdminCreateUpdateBookScreenImpl />
      </AdminCreateUpdateBookScreenVmProvider>
    );
  });

const AdminCreateUpdateBookScreenImpl: React.FC = observer(() => {
  const vm = useAdminCreateUpdateBookScreenVm();
  const [, navigate] = useLocation();

  const handleChange = <T,>(name: string, value: T) => {
    vm.setBookDetails({ [name]: value });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    vm.setBookDetails({ [name]: value });
  };

  return (
    <AdminPageRoot>
      <form
        className={"flex flex-col gap-2"}
        onSubmit={async (e) => {
          e.preventDefault();
          await vm.submit();
          navigate("/");
        }}
      >
        <div>
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            name="title"
            value={vm.book.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="author">Автор</Label>
          <Input
            id="author"
            name="author"
            value={vm.book.author}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category">Категория</Label>
          <Input
            id="category"
            name="category"
            value={vm.book.category}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="purchase_price">Цена покупки (руб.)</Label>
          <NumberInput
            id="purchase_price"
            name="purchase_price"
            value={vm.book.purchase_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="two_weeks_rent_price">
            Цена аренды на две недели (руб.)
          </Label>
          <NumberInput
            id="two_weeks_rent_price"
            name="two_weeks_rent_price"
            value={vm.book.two_weeks_rent_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="month_rent_price">Цена аренды на месяц (руб.)</Label>
          <NumberInput
            id="month_rent_price"
            name="month_rent_price"
            value={vm.book.month_rent_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="three_month_rent_price">
            Цена аренды на три месяца (руб.)
          </Label>
          <NumberInput
            id="three_month_rent_price"
            name="three_month_rent_price"
            value={vm.book.three_month_rent_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="year_published">Год публикации</Label>
          <NumberInput
            id="year_published"
            name="year_published"
            value={vm.book.year_published}
            onChange={(name, value) =>
              handleChange(name, clamp(value, 0, 2024))
            }
          />
        </div>
        <div>
          <Label htmlFor="text">Текст</Label>
          <Textarea
            id={"text"}
            name="text"
            value={vm.book.text}
            onChange={(e) => {
              const { name, value } = e.target;
              handleChange(name, value);
            }}
          />
        </div>
        <div className={"flex flex-row items-center gap-2"}>
          <Label htmlFor="is_hidden">Скрыто</Label>
          <Switch
            id="is_hidden"
            checked={vm.book.is_hidden}
            onCheckedChange={(checked) =>
              handleSwitchChange("is_hidden", checked)
            }
          />
        </div>
        <Button className={"mt-2"} type="submit" disabled={vm.isSubmitting}>
          {vm.bookId ? "Обновить книгу" : "Создать книгу"}
        </Button>
      </form>
    </AdminPageRoot>
  );
});

const NumberInput: React.FC<{
  id: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}> = ({ id, name, value, onChange }) => {
  return (
    <Input
      id={id}
      name={name}
      value={value.toString()}
      onChange={(e) => {
        const parsed = parseInt(e.target.value);
        onChange(e.target.name, isNaN(parsed) ? 0 : parsed);
      }}
    />
  );
};
