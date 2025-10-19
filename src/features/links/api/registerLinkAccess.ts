import { useMutation } from "@tanstack/react-query";

import env from "@/config";

const registerLinkAccess = async (linkId: string) => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ linkId }),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de acesso ao link.");
  }
};

export const useRegisterLinkAccess = () => {
  return useMutation({
    mutationFn: (linkId: string) => registerLinkAccess(linkId),
  });
};
