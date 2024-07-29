import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { MutationKeys } from "../mutation-keys";
import { frontServiceAxios, serviceAxios } from "../axios";

export interface ILoginForm {
  userName: string;
  password: string;
}

const handleLogin = async ({
  userName,
  password,
}: ILoginForm): Promise<string | undefined> => {
  try {
    const resp = await serviceAxios.post("/security/createToken", {
      userName,
      password,
    });

    if (resp?.data) {
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
    }

    return resp?.data as string;
  } catch (error: any) {
    showNotification({
      message: error?.message,
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
  return useMutation({
    mutationFn: async (form: ILoginForm) => handleLogin(form),
    mutationKey: [MutationKeys.LOGIN],
    ...options,
  });
};

export { useLogin };
