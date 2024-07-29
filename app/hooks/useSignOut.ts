import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const [signOutError, setSignOutError] = useState<string | undefined>(
    undefined
  );

  const signOut = async () => {
    try {
      router.push(`/auth/signin`);
      deleteCookie("token");
      window.localStorage.clear();
    } catch (err: any) {
      setSignOutError(err.message);
    }
  };

  return { signOut, signOutError };
};
