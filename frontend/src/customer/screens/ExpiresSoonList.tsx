import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/api.ts";
import { SchemaBookInstanceDto } from "@/gen/schema";
import dayjs from "dayjs";

export const ExpiresSoonList = observer(() => {
  const [instancesExpiringSoon, setInstancesExpiringSoon] = useState<
    SchemaBookInstanceDto[]
  >([]);
  const init = useCallback(async () => {
    const { data } = await api.GET("/books/expiring_soon");
    setInstancesExpiringSoon(data!);
  }, [setInstancesExpiringSoon]);
  useEffect(() => {
    init();
  }, [init]);

  if (instancesExpiringSoon.length === 0) {
    return null;
  }

  return (
    <div className={"flex flex-col bg-amber-300 bg-opacity-25 p-4 rounded-sm"}>
      <div className={"text-lg font-bold"}>
        Скоро заканчивается аренда у следующих книг:
      </div>
      <ul>
        {instancesExpiringSoon.map((instance) => (
          <li key={instance.book_id}>
            {instance.book.title} -{" "}
            {dayjs(instance.expiration_date).format("d MMM, YYYY")}
          </li>
        ))}
      </ul>
    </div>
  );
});
