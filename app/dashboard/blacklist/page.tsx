"use client";

import { Divider, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  IKaraGetirTableResponse,
  IKaraGetirTableValue,
  useGetKaraGetir,
} from "@/app/services/blackList/useGetKaraGetir";
import BlackListTable from "./components/BlackListTable";
import BlackListTableHeader from "./components/TeamsTableHeader";

const BlackListPage = () => {
  const [data, setData] = useState<IKaraGetirTableValue[]>([]);
  const [modalType, setModalType] = useState<"update" | "create">("create");
  const [isBlackInfoModalOpen, setIsBlackInfoModalOpen] = useState(false);

  const { mutateAsync: fetchTable, isPending } = useGetKaraGetir({
    onSuccess: (resp: IKaraGetirTableResponse) => {
      setData(resp?.value);
    },
  });

  useEffect(() => {
    fetchTable({});
  }, []);

  return (
    <Paper shadow="xl" py={12}>
      <BlackListTableHeader
        setModalType={setModalType}
        setIsBlackInfoModalOpen={(val: boolean) => setIsBlackInfoModalOpen(val)}
      />
      <Divider px={12} />
      <BlackListTable
        data={data}
        isLoading={isPending}
        refreshResults={() => fetchTable({})}
        modalType={modalType}
        setModalType={setModalType}
        isBlackInfoModalOpen={isBlackInfoModalOpen}
        setIsBlackInfoModalOpen={(val: boolean) => setIsBlackInfoModalOpen(val)}
      />
    </Paper>
  );
};

export default BlackListPage;
