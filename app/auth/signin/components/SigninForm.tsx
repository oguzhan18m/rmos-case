import React from "react";
import { TextInput, PasswordInput, Button, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { isEmail } from "@mantine/form";
import { useLogin } from "@/app/services/auth/useLogin";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import AppLogo from "@/app/components/logo/AppLogo";

function SignInForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Geçersiz Email"),
      password: (value) =>
        value.length < 5 ? "Şifre en az 5 karakter olmalıdır." : null,
    },
  });

  const { mutateAsync: registerUser, isPending: isLoading } = useLogin({
    onSuccess: (resp: string) => {
      setCookie("token", resp);
      router.push(`/dashboard/tarih-forecast`);
      showNotification({ message: "Giriş başarılı", color: "green" });
    },
    onError: (err: any) => {
      showNotification({ message: err.message, color: "green" });
    },
  });

  const handleSubmit = (values: any) => {
    // Handle form submission here
    console.log("Form submitted:", values);
    registerUser({ userName: values.email, password: values.password });
  };

  return (
    <Paper
      shadow="xl"
      p={40}
      style={{ minWidth: 400, maxWidth: 500 }}
      mx="auto"
    >
      <AppLogo width={88} height={42} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Kullanıcı adı"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Şifre"
          placeholder="Örn: 12345"
          mt="md"
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl" disabled={!form.isValid()}>
          Giriş yap
        </Button>
      </form>
    </Paper>
  );
}

export default SignInForm;
