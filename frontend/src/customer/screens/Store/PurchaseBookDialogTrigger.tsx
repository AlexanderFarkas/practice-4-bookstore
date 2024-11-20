import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog.tsx";
import React from "react";
import { observer } from "mobx-react-lite";
import {
  PurchaseBookDialogTriggerVmProps,
  PurchaseBookDialogTriggerVmProvider,
  usePurchaseBookDialogTriggerVm,
} from "./PurchaseBookDialogTriggerVm";
import { TypographyH2 } from "@/common/components/typography.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/common/components/ui/label.tsx";
import { LoadingSpinner } from "@/common/components/ui/spinner.tsx";
import { SchemaCustomerBookDto, SchemaPurchaseType } from "@/gen/schema";
import { Button } from "@/common/components/ui/button.tsx";
import { useLocation } from "wouter";

export const PurchaseBookDialogTrigger: React.FC<PurchaseBookDialogTriggerVmProps> =
  observer((props) => {
    const { children, book } = props;
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <PurchaseBookDialogTriggerVmProvider book={book}>
            <PurchaseBookDialogTriggerImpl book={book} />
          </PurchaseBookDialogTriggerVmProvider>
        </DialogContent>
      </Dialog>
    );
  });

const PurchaseBookDialogTriggerImpl = observer(
  ({ book }: { book: SchemaCustomerBookDto }) => {
    const vm = usePurchaseBookDialogTriggerVm();
    const [, navigate] = useLocation();
    return (
      <>
        <DialogHeader>
          <DialogTitle>Покупка</DialogTitle>
        </DialogHeader>
        <div className={"flex flex-col gap-4"}>
          <TypographyH2>
            {book.title}. <span className={"text-base"}>{book.author}</span>
          </TypographyH2>
          {vm.isLoading ? (
            <LoadingSpinner className={"m-4"} />
          ) : vm.hasActiveInstance ? (
            <div>Эта книга уже есть в Вашей коллекции</div>
          ) : (
            <div className={"flex flex-col gap-4"}>
              <RadioGroup
                value={vm.purchaseType}
                onValueChange={(value) =>
                  (vm.purchaseType = value as SchemaPurchaseType)
                }
              >
                <RadioItem
                  value={"forever"}
                  label={"Навсегда"}
                  price={book.purchase_price}
                />
                <RadioItem
                  value={"two_weeks"}
                  label={"На две недели"}
                  price={book.two_weeks_rent_price}
                />
                <RadioItem
                  value={"month"}
                  label={"На месяц"}
                  price={book.month_rent_price}
                />
                <RadioItem
                  value={"three_months"}
                  label={"На три месяца"}
                  price={book.three_month_rent_price}
                />
              </RadioGroup>
              <Button
                onClick={async () => {
                  await vm.submit();
                  navigate("/orders");
                }}
                disabled={vm.isSubmitting}
              >
                Купить
              </Button>
            </div>
          )}
        </div>
      </>
    );
  },
);

const RadioItem = observer(
  ({
    value,
    label,
    price,
  }: {
    value: SchemaPurchaseType;
    label: string;
    price: number;
  }) => {
    return (
      <div className="flex items-center gap-2">
        <RadioGroupItem value={value} id={value} />
        <Label htmlFor={value}>
          {label} ({price} руб.)
        </Label>
      </div>
    );
  },
);
