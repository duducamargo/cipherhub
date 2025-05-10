"use client";
import React from "react";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function App() {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-[57px] font-bold text-center text-white font-sans tracking-tight">
          Conhecimento em segurança e criptografia{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">CipherHub.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">CipherHub.</span>
            </div>
          </div>
        </h2>
      </BackgroundBeamsWithCollision>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-[#111] text-white w-full gap-4 mx-auto px-8">
        <Card title="Criptografia Base 64" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-green-600 cursor-pointer"
          />
        </Card>
        <Card title="Criptografia SHA-256" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-red-800 cursor-pointer"
            colors={[[255, 0, 0]]}
          />
        </Card>

        <Card title="Criptografia RSA" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 cursor-pointer"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-white dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
