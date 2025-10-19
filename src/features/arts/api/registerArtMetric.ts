import { useMutation } from "@tanstack/react-query";

import env from "@/config";

type RegisterArtMetrics = { xProfile: string };

const registerArtMetrics = async ({ xProfile }: RegisterArtMetrics) => {
  const body = JSON.stringify({ xProfile });

  const response = await fetch(`${env.VITE_API_URL}/metrics/arts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de registro de arte.");
  }
};

export const useRegisterArtMetrics = () => {
  return useMutation({
    mutationFn: ({ xProfile }: RegisterArtMetrics) =>
      registerArtMetrics({ xProfile }),
  });
};
