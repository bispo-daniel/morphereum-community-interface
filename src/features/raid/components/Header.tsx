import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import getCurrentDate from "@/utils/getCurrentDate";

const Header: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { formattedDay, capitalizedMonth, year } = useMemo(getCurrentDate, []);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [inView, controls]);

  const elements = useMemo(
    () => [
      {
        component: (
          <PrettyDate
            key="date"
            formattedDay={formattedDay}
            capitalizedMonth={capitalizedMonth}
            year={year}
          />
        ),
        width: "w-0 lg:w-[20%]",
      },
      { component: <Heading key="heading" />, width: "w-full lg:w-[50%]" },
      { component: <CommunityLore key="lore" />, width: "w-0 lg:w-[20%]" },
    ],
    [formattedDay, capitalizedMonth, year],
  );

  return (
    <div
      ref={ref}
      className="flex items-center w-full mt-2 justify-evenly lg:gap-4"
    >
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={element.width}
          animate={controls}
          initial={{ opacity: 0, y: 20 }}
        >
          {element.component}
        </motion.div>
      ))}
    </div>
  );
};

const PrettyDate: React.FC<{
  formattedDay: string;
  capitalizedMonth: string;
  year: number;
}> = ({ formattedDay, capitalizedMonth, year }) => (
  <Card className="hidden w-full lg:block">
    <CardHeader className="p-0">
      <CardTitle className="flex items-center w-full h-16 text-sm select-none">
        <div className="flex h-full w-[100px] items-center justify-center">
          <span className="text-[32px]">{formattedDay}</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center justify-between w-full">
          <span>{capitalizedMonth}</span>
          <span>{year}</span>
        </div>
      </CardTitle>
    </CardHeader>
  </Card>
);

const Heading: React.FC = () => (
  <Card className="w-full">
    <CardHeader className="p-0">
      <CardTitle className="flex h-full w-full select-none items-center justify-center text-[30px] md:text-[60px]">
        <span className="w-full text-center h-fit break-keep">$Morphereum Raid</span>
      </CardTitle>
    </CardHeader>
  </Card>
);

const CommunityLore: React.FC = () => (
  <Card className="hidden w-full lg:block">
    <CardHeader>
      <CardTitle className="w-full text-center select-none">
        <span>Make $Morphereum Great again</span>
      </CardTitle>
    </CardHeader>
  </Card>
);

export default Header;
