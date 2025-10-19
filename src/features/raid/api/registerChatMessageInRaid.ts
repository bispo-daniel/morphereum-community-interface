import { useMutation } from "@tanstack/react-query";

import env from "@/config";

const registerChatMessageInRaid = async () => {
  const response = await fetch(
    `${env.VITE_API_URL}/metrics/chat/raid-message`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de mensagem de chat no raid.");
  }
};

export const useRegisterChatMessageInRaid = () => {
  return useMutation({
    mutationFn: () => registerChatMessageInRaid(),
  });
};
