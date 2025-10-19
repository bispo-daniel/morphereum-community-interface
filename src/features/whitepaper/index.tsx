import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => {
  const items = React.Children.toArray(children);
  return (
    <div className="flex gap-2">
      {items.map((child, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
        >
          {child}
        </motion.span>
      ))}
    </div>
  );
};

const Whitepaper = () => {
  useEffect(() => {
    document.title = "Comunidade $Morphereum – Whitepaper";

    return () => {
      document.title = "Comunidade $Morphereum";
    };
  }, []);

  const title = "A comunidade $Morphereum".split(" ");
  const paragraphs = [
    "Bem-vindo à nossa comunidade! Somos um grupo dedicado a quem já possui o token $Morphereum e quer colaborar para gerar valor ao token, além de esclarecer dúvidas sobre sua autenticidade e promover seu crescimento. Aqui, incentivamos a colaboração aberta e proativa, combinada com a inovação para criar projetos e divulgar o $Morphereum de forma impactante.",
    "Nossa comunidade funciona como um ponto de encontro para criadores, desenvolvedores e entusiastas, onde você pode:",
    " • Produzir e compartilhar artes, músicas, vídeos, jogos e aplicativos.",
    " • Participar de projetos open-source no GitHub, que podem ser usados como experiência profissional.",
    " • Engajar-se nos daily raids nas redes sociais, organizados diariamente para alavancar o alcance do token.",
    "Utilizamos Discord para comunicação principal, X (antigo Twitter) para publicações e engajamento, e GitHub para hospedar e gerenciar projetos open-source. No site da comunidade, você pode acompanhar métricas como cliques em raids, acessos à plataforma e outros indicadores importantes para avaliar o impacto de nossas ações.",
    "Não há requisitos mínimos para participar: basta acompanhar o Discord, o X e nossa plataforma para se manter conectado e contribuir com o que puder. Junte-se a nós e faça parte de uma comunidade dedicada a transformar o $Morphereum em um token de destaque!",
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="flex justify-center w-full mt-12">
      <div className="flex w-[90%] flex-col gap-6 lg:w-[60%]">
        <Trail open={inView}>
          {title.map((word, index) => (
            <span
              key={index}
              className="text-xl italic font-normal select-none sm:text-3xl"
            >
              {word}
            </span>
          ))}
        </Trail>

        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="pb-1 m-0 text-sm text-justify break-words align-middle select-none text-pretty"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default Whitepaper;
