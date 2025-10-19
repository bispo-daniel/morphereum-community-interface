import { AtSign } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { NewArtData, useRegisterArt } from "../api/registerArt";
import { useRegisterArtMetrics } from "../api/registerArtMetric";

const CreateNewArtSheet = () => {
  const { toast } = useToast();
  const { mutate: registerArtMutate, isSuccess, isError } = useRegisterArt();
  const { mutate: registerArtMetricsMutate } = useRegisterArtMetrics();
  const hasLocalStorage =
    localStorage.getItem("creator") !== null &&
    localStorage.getItem("xProfile") !== null;

  const [newArt, setNewArt] = useState<NewArtData>({
    creator: "",
    xProfile: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    setNewArt((prev) => ({
      ...prev,
      creator: localStorage.getItem("creator") || "",
      xProfile: localStorage.getItem("xProfile") || "",
    }));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Arte registrada com sucesso!",
        description: "A arte será submetida para aprovação.",
      });

      localStorage.setItem("creator", newArt.creator);
      localStorage.setItem("xProfile", newArt.xProfile);
    }

    if (isError) {
      toast({
        title: "Erro ao registrar arte.",
        description: "Tente novamente mais tarde.",
      });
    }
  }, [isSuccess, isError]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewArt((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = /^image\//;

      if (!allowedTypes.test(file.type)) {
        toast({
          title: "Erro ao enviar imagem.",
          description: "O arquivo deve ser uma imagem.",
        });

        event.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "Erro ao enviar imagem.",
          description: "A imagem deve ter no máximo 10MB.",
        });

        event.target.value = "";
        return;
      }

      setNewArt((prev) => ({ ...prev, file }));
    }
  };

  const registerArt = () => {
    if (
      !newArt.creator ||
      !newArt.xProfile ||
      !newArt.description ||
      !newArt.file
    ) {
      toast({
        title: "Preencha todos os campos.",
        description: "Todos os campos são obrigatórios.",
      });
      return;
    }

    registerArtMutate(newArt);
    registerArtMetricsMutate({ xProfile: newArt.xProfile });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <p className="z-[30] mb-4 inline-flex h-10 select-none items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-2xl font-medium transition-colors hover:cursor-pointer hover:bg-transparent hover:font-bold hover:underline focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-slate-50">
          [Criar uma nova arte]
        </p>
      </SheetTrigger>
      <SheetContent className="space-between mt-[30px] flex h-full w-[400px] select-none flex-col sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Criar nova arte</SheetTitle>
          <SheetDescription>
            A arte será submetida para aprovação.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="creator" className="text-left">
              Criador
            </Label>
            <div className="flex">
              <Button
                variant="outline"
                size="icon"
                className="border-r-0 rounded-r-none"
                disabled
              >
                <AtSign />
              </Button>
              <Input
                id="creator"
                value={newArt.creator}
                placeholder="Criador"
                onChange={onChange}
                className="col-span-3 rounded-l-none"
                readOnly={hasLocalStorage}
                disabled={hasLocalStorage}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="xProfile" className="text-left">
              Link do X
            </Label>
            <div className="flex">
              <Button
                variant="outline"
                className="border-r-0 rounded-r-none"
                disabled
              >
                https://x.com/
              </Button>
              <Input
                id="xProfile"
                value={newArt.xProfile}
                placeholder="Perfil do X"
                onChange={onChange}
                className="col-span-3 rounded-l-none"
                readOnly={hasLocalStorage}
                disabled={hasLocalStorage}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="description" className="text-left">
              Descrição
            </Label>
            <Textarea
              placeholder="Escreva a descrição aqui"
              value={newArt.description}
              id="description"
              maxLength={200}
              onChange={onChange}
              className="max-h-[100px]"
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="image" className="text-left">
              Imagem
            </Label>
            <Input
              id="image"
              type="file"
              className="col-span-3"
              onChange={onFileChange}
              accept="image/*"
            />
          </div>
        </div>
        <SheetFooter className="pb-4 mt-auto">
          <SheetClose asChild>
            <Button type="submit" onClick={registerArt}>
              Enviar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewArtSheet;
