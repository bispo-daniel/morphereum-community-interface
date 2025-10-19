import { useMutation } from "@tanstack/react-query";

import env from "@/config";

export type NewArtData = {
  creator: string;
  xProfile: string;
  description: string;
  file: File | null;
};

const registerArt = async (newArt: NewArtData) => {
  if (!newArt.file) return;

  const formdata = new FormData();
  formdata.append("image", newArt.file);
  formdata.append("creator", "@" + newArt.creator);
  formdata.append("xProfile", "https://x.com/" + newArt.xProfile);
  formdata.append("description", newArt.description);

  const response = await fetch(`${env.VITE_API_URL}/arts`, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar nova arte.");
  }
};

export const useRegisterArt = () => {
  return useMutation({
    mutationFn: (newArt: NewArtData) => registerArt(newArt),
  });
};
