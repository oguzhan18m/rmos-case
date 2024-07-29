"use client";

import { Divider, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import TarihForecastTable from "./components/TarihForecastTable";
import {
  ITableResponse,
  ITableValue,
  useGetStpRmForKlasik2,
} from "@/app/services/stpRmForKlasik/useGetStpRmForKlasik2";
import TarihForecastTableHeader from "./components/TarihForecastTableHeader";

const TarihForecastPage = () => {
  const [data, setData] = useState<ITableValue[]>([]);

  const {
    mutateAsync: fetchTable,
    isPending,
    reset,
  } = useGetStpRmForKlasik2({
    onSuccess: (resp: ITableResponse) => {
      console.log("onsuccess repsonse", resp);

      setData(resp?.value);
    },
  });

  useEffect(() => {
    fetchTable({});
  }, []);

  return (
    <Paper shadow="xl" py={12}>
      <TarihForecastTableHeader />
      <Divider px={12} />
      <TarihForecastTable
        data={data}
        isLoading={isPending}
        refreshResults={reset}
      />
    </Paper>
  );
};

export default TarihForecastPage;
