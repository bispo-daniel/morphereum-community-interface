import { useMutation } from "@tanstack/react-query";

import env from "@/config";

const registerChatMessage = async () => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/chat`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de mensagem de chat.");
  }
};

export const useRegisterChatMessage = () => {
  return useMutation({
    mutationFn: () => registerChatMessage(),
  });
};
