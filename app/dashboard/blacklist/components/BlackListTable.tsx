import React, { useState } from "react";
import { Center, Loader, Table } from "@mantine/core";
import moment from "moment";
import { IKaraGetirTableValue } from "@/app/services/blackList/useGetKaraGetir";
import BlackInfoModal from "./BlackListAddEditModal";

interface BlackListTableProps {
  data: IKaraGetirTableValue[] | undefined;
  isLoading: boolean;
  refreshResults: () => void;
  modalType: "update" | "create";
  setModalType: (value: "update" | "create") => void;
  isBlackInfoModalOpen: boolean;
  setIsBlackInfoModalOpen: (value: boolean) => void;
}

const BlackListTable = ({
  data,
  isLoading,
  modalType,
  setModalType,
  isBlackInfoModalOpen,
  setIsBlackInfoModalOpen,
  refreshResults,
}: BlackListTableProps) => {
  const [selectedBlackInfo, setSelectedBlackInfo] = useState<
    IKaraGetirTableValue | undefined
  >();

  const handleSelectItem = (item: IKaraGetirTableValue) => {
    setSelectedBlackInfo(item);
    setModalType("update");
    setIsBlackInfoModalOpen(true);
  };

  //Table rows
  const rows = data?.map((r: IKaraGetirTableValue, index: number) => (
    <Table.Tr
      onClick={() => handleSelectItem(r)}
      key={index}
      style={{ overflowX: "hidden", cursor: "pointer" }}
    >
      <Table.Td>{r?.Adi}</Table.Td>
      <Table.Td>{r?.Soy}</Table.Td>
      <Table.Td>{r?.Tcno}</Table.Td>
      <Table.Td>{r?.Kimlik_no}</Table.Td>
      <Table.Td>{moment(r?.Dogum_tarihi).format("DD.MM.YYYY")}</Table.Td>
      <Table.Td>{moment(r?.Sistem_tarihi).format("DD.MM.YYYY")}</Table.Td>
      <Table.Td>{r?.Aciklama}</Table.Td>
      <Table.Td>{r?.Sistem_grubu}</Table.Td>
      <Table.Td>{r?.["ULke Adı"]}</Table.Td>
      <Table.Td>{r?.Ulke_xml}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return (
      <Center w="100%" p={20}>
        <Loader size="sm" />
      </Center>
    );
  }

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table
          highlightOnHover
          striped
          stickyHeader
          stickyHeaderOffset={0}
          verticalSpacing="sm"
        >
          <Table.Thead py={12}>
            <Table.Tr>
              <Table.Th>Adı</Table.Th>
              <Table.Th>Soyadı</Table.Th>
              <Table.Th>TC.NO</Table.Th>
              <Table.Th>Kimlik No</Table.Th>
              <Table.Th>Doğum Tarihi</Table.Th>
              <Table.Th>Sistem Tarihi</Table.Th>
              <Table.Th>Açıklama</Table.Th>
              <Table.Th>Grubu</Table.Th>
              <Table.Th>Milliyet Adı</Table.Th>
              <Table.Th>Milliyet</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* DETAIL MODAL */}
      <BlackInfoModal
        modalType={modalType}
        opened={isBlackInfoModalOpen}
        onClose={() => setIsBlackInfoModalOpen(false)}
        data={selectedBlackInfo as IKaraGetirTableValue}
        refreshResults={refreshResults}
      />
    </>
  );
};

export default BlackListTable;
