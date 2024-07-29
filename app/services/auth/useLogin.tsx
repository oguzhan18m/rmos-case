import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { MutationKeys } from "../mutation-keys";
import { frontServiceAxios, serviceAxios } from "../axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ILoginForm {
  userName: string;
  password: string;
}

const handleLogin = async (
  router: AppRouterInstance,
  { userName, password }: ILoginForm
): Promise<string | undefined> => {
  try {
    const resp = await serviceAxios.post("/security/createToken", {
      userName,
      password,
    });

    if (resp?.data) {
      setCookie("token", resp?.data);
      frontServiceAxios.interceptors.request.use(
        (config) => {
          const token = resp?.data;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      router.push(`/dashboard/tarih-forecast`);
      showNotification({ message: "Giriş başarılı", color: "green" });
    }

    return resp?.data as string;
  } catch (error: any) {
    showNotification({
      message: error?.message ?? "Something went wrong while logging in",
      color: "red",
    });
  }
};

const useLogin = (
  options?: Omit<
    UseMutationOptions<any, unknown, any, unknown>,
    "mutationFn" | "mutationKey"
  >
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (form: ILoginForm) => await handleLogin(router, form),
    mutationKey: [MutationKeys.LOGIN],
    ...options,
  });
};

export { useLogin };
