import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { frontServiceAxios } from "../axios";
import { MutationKeys } from "../mutation-keys";
import { IKaraGetirTableValue } from "./useGetKaraGetir";

export type IKaraBody = Partial<IKaraGetirTableValue>;

const handleAddToBlackList = async (body: IKaraBody) => {
  console.log({ body });

  try {
    const resp = await frontServiceAxios.post("/Kara/Ekle", {
      ...body,
      db_Id: 9,
    });

    console.log({ resp });

    return resp?.data;
  } catch (error: any) {
    showNotification({
      message: error?.message,
      color: "red",
    });
  }
};

const useKaraEkle = (
  options?: Omit<
    UseMutationOptions<any, unknown, any, unknown>,
    "mutationFn" | "mutationKey"
  >
) => {
  return useMutation({
    mutationKey: [MutationKeys.KARA_EKLE],
    mutationFn: async (body: IKaraBody) => await handleAddToBlackList(body),
    ...options,
  });
};

export { useKaraEkle };
