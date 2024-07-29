import React from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Select,
  Textarea,
} from "@mantine/core";
import { IKaraGetirTableValue } from "@/app/services/blackList/useGetKaraGetir";
import { IKaraBody, useKaraEkle } from "@/app/services/blackList/useKaraEkle";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

interface Props {
  opened: boolean;
  onClose: () => void;
  data: IKaraGetirTableValue;
  modalType: "update" | "create";
  refreshResults: () => void;
}

const BlackListAddEditModal = ({
  opened,
  onClose,
  refreshResults,
  data,
  modalType,
}: Props) => {
  const initialData: IKaraBody = {
    Id: 0,
    Adi: "",
    Soy: "",
    Aciklama: "",
    Tcno: "",
    Kimlik_no: "",
    Dogum_tarihi: new Date(),
    Sistem_tarihi: new Date(),
    Sistem_grubu: "",
    Otel_kodu: "",
    Ulke_xml: "",
    Kulanici: "",
    Acenta: "",
    "Xml Kodu": "",
    "ULke Adı": "",
  };
  const [formData, setFormData] = React.useState<IKaraBody>({
    ...initialData,
  });

  React.useEffect(() => {
    if (modalType === "update" && data) {
      setFormData({
        ...data,
        Dogum_tarihi: !!data?.Dogum_tarihi
          ? new Date(data?.Dogum_tarihi)
          : new Date(),
        Sistem_tarihi: !!data?.Sistem_tarihi
          ? new Date(data?.Sistem_tarihi)
          : new Date(),
      });
    } else {
      setFormData({ ...initialData });
    }
  }, [modalType, data]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutateAsync: addEditBlackList } = useKaraEkle({
    onSettled: async () => {
      refreshResults();
      onClose();
    },
  });

  const handleSubmit = async () => {
    const body = {
      ...formData,
    };
    await addEditBlackList(body);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={modalType === "update" ? "Kişi Güncelle" : "Kişi Ekle"}
      size="lg"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="md">
          <TextInput
            label="ID"
            disabled
            value={formData.Id}
            onChange={(event) => handleChange("Id", event.currentTarget.value)}
          />
          <TextInput
            label="Adı"
            value={formData.Adi}
            onChange={(event) => handleChange("Adi", event.currentTarget.value)}
          />
          <TextInput
            label="Soyadı"
            value={formData.Soy}
            onChange={(event) => handleChange("Soy", event.currentTarget.value)}
          />
          <Textarea
            label="Açıklama"
            value={formData.Aciklama}
            onChange={(event) =>
              handleChange("Aciklama", event.currentTarget.value)
            }
            rows={3}
          />
          <TextInput
            label="TC No"
            value={formData.Tcno}
            onChange={(event) =>
              handleChange("Tcno", event.currentTarget.value)
            }
          />
          <TextInput
            label="Kimlik No"
            value={formData.Kimlik_no}
            onChange={(event) =>
              handleChange("Kimlik_no", event.currentTarget.value)
            }
          />
          <DateInput
            label="Doğum tarihi"
            value={new Date(formData.Dogum_tarihi as Date)}
            onChange={(value) => handleChange("Dogum_tarihi", value)}
          />
          <DateInput
            label="Sistem tarihi"
            value={new Date(formData.Sistem_tarihi as Date)}
            onChange={(value) => handleChange("Sistem_tarihi", value)}
          />
          <Select
            label="Sistem Grubu"
            data={["Genel", "Özel", "Diğer"]} // Add more options as needed
            value={formData.Sistem_grubu}
            onChange={(value) => handleChange("Sistem_grubu", value)}
          />
          <TextInput
            label="Ülke XML"
            value={formData.Ulke_xml}
            onChange={(event) =>
              handleChange("Ulke_xml", event.currentTarget.value)
            }
          />
          <TextInput
            label="XML Kodu"
            value={formData["Xml Kodu"]}
            onChange={(event) =>
              handleChange("Xml Kodu", event.currentTarget.value)
            }
          />
          <TextInput
            label="Ülke Adı"
            value={formData["ULke Adı"]}
            onChange={(event) =>
              handleChange("ULke Adı", event.currentTarget.value)
            }
          />
          <Button onClick={handleSubmit} fullWidth mt="md">
            {modalType === "update" ? "Kaydet" : "Kişi ekle"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default BlackListAddEditModal;
