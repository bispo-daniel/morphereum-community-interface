import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useLinks } from "./api/getLinks";
import { LinkSkeleton, ShareButton } from "./components";

const Links = () => {
  useEffect(() => {
    document.title = "Comunidade $Morphereum – Links";

    return () => {
      document.title = "Comunidade $Morphereum";
    };
  }, []);

  const { data: links, isFetching } = useLinks();

  const communityLinks =
    links?.filter((link) => link.type === "community-links") || [];

  const tokenLinks =
    links?.filter((link) => link.type === "official-links") || [];

  const { ref, inView } = useInView({ threshold: 0.1 });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="flex justify-center px-4 mt-12">
      <div className="w-full max-w-[700px]">
        <h1 className="text-3xl font-bold text-center select-none">🔗 Links</h1>
        <h2 className="mt-8 text-xl font-bold select-none">🌐 Comunidade</h2>
        {isFetching
          ? Array.from({ length: 3 }).map((_v, i) => <LinkSkeleton key={i} />)
          : communityLinks.map(({ _id, label, url, icon }, index) => (
              <motion.div
                key={_id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ShareButton
                  linkId={_id}
                  platform={label}
                  url={url}
                  icon={icon}
                />
              </motion.div>
            ))}

        <h2 className="mt-8 text-xl font-bold select-none">💰 Token</h2>
        {isFetching
          ? Array.from({ length: 5 }).map((_v, i) => <LinkSkeleton key={i} />)
          : tokenLinks.map(({ _id, label, url, icon }, index) => (
              <motion.div
                key={_id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{
                  delay: (communityLinks.length + index) * 0.1,
                  duration: 0.5,
                }}
              >
                <ShareButton
                  linkId={_id}
                  platform={label}
                  url={url}
                  icon={icon}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Links;
