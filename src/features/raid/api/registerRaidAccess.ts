import { useMutation } from "@tanstack/react-query";

import env from "@/config";

const registerRaidAccess = async () => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/raids`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de acesso ao raid.");
  }
};

export const useRegisterRaidAccess = () => {
  return useMutation({
    mutationFn: () => registerRaidAccess(),
  });
};
