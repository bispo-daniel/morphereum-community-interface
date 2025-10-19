import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const RaidDataSchema = z.object({
  date: z.string(),
  platform: z.string(),
  url: z.string(),
  shareMessage: z.string(),
  content: z.string(),
});

export type RaidData = z.infer<typeof RaidDataSchema>;

const getRaidData = async () => {
  try {
    const response = await fetch(`${env.VITE_API_URL}/raid`);

    if (!response.ok) {
      console.error("Erro ao buscar dados:", response.statusText);
      return defaultRaidData;
    }

    const data = await response.json();

    return data as RaidData;
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return defaultRaidData;
  }
};

export const useRaidData = () =>
  useQuery({
    queryKey: ["raidData"],
    queryFn: getRaidData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

const defaultRaidData: RaidData = {
  date: "14/01/2025",
  platform: "CoinMarketCap",
  url: "https://coinmarketcap.com/dexscan/solana/Bzc9NZfMqkXR6fz1DBph7BDf9BroyEf6pnzESP7v5iiw",
  shareMessage:
    "Participe do Raid do $Morphereum no CoinMarketCap! 🚀🔥 #Morphereum",
  content:
    "## 🚀 Organize-se para o Raid do **Morphereum** no CoinMarketCap! 🔥\n\n### 📢 O que está acontecendo?  \nA **Morphereum** ainda **não está verificada** no CoinMarketCap! 😱  \nPrecisamos da sua ajuda para mudar isso. **Vote agora** para que o token seja verificado e ganhe mais visibilidade na comunidade!  \n\n---\n\n### 🌟 Por que votar no Morphereum?  \n- 💎 **Projetos promissores merecem destaque!**  \n- 📈 A verificação no CoinMarketCap traz mais confiança e engajamento para o token.  \n- 💬 Vamos unir a comunidade do Morphereum para mostrar nossa força!  \n\n---\n\n### 📲 Como votar?  \n1. Acesse o link do token no CoinMarketCap:  \n   👉 [Morphereum no CMC](https://coinmarketcap.com/dexscan/solana/Bzc9NZfMqkXR6fz1DBph7BDf9BroyEf6pnzESP7v5iiw/)  \n2. Clique no **joinha** 👍 e ajude a **Morphereum** a ser reconhecida! 🗳️  \n\n---\n\n### ✊ Vamos juntos!  \nMostre que a **comunidade** é forte e apoia o projeto! Compartilhe esta mensagem e convoque seus amigos para o **Raid do Morphereum no CMC**! 🌐🔥  \n\n---\n\n**🔗 Link direto para votação:**  \n👉 [Vote aqui!](https://coinmarketcap.com/dexscan/solana/Bzc9NZfMqkXR6fz1DBph7BDf9BroyEf6pnzESP7v5iiw/)  \n\n**🌍 Juntos, somos mais fortes. Vamos fazer o Morphereum brilhar! 💪**",
};
