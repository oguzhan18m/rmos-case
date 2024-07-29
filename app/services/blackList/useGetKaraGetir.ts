import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { frontServiceAxios } from "../axios";
import { MutationKeys } from "../mutation-keys";

export interface IKaraGetirTableValue {
  Id: number;
  Adi: string;
  Soy: string;
  Aciklama: string;
  Tcno: string;
  Kimlik_no: string;
  Dogum_tarihi: string | Date;
  Sistem_tarihi: string | Date;
  Sistem_grubu: string;
  Otel_kodu: string | null | number;
  Ulke_xml: string;
  Kulanici: string;
  Acenta: string | null;
  "Xml Kodu": string;
  "ULke Adı": string;
}

export interface IKaraGetirTableResponse {
  isSucceded: boolean;
  message: string | null;
  messageList: any[];
  value: IKaraGetirTableValue[];
}

const handleFetchTable = async () => {
  try {
    const resp = await frontServiceAxios.post("/Kara/Getir_Kod", {
      db_Id: 9,
      Adi: "ALL?",
    });

    console.log({ resp });

    return resp?.data as IKaraGetirTableResponse;
  } catch (error: any) {
    showNotification({
      message: error?.message,
      color: "red",
    });
  }
};

const useGetKaraGetir = (
  options?: Omit<
    UseMutationOptions<any, unknown, any, unknown>,
    "mutationFn" | "mutationKey"
  >
) => {
  return useMutation({
    mutationKey: [MutationKeys.KARA_GETIR],
    mutationFn: async () => await handleFetchTable(),
    ...options,
  });
};

export { useGetKaraGetir };
