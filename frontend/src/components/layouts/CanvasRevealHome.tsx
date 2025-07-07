import React, { useEffect } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoading } from "@/contexts/LoadingContext";

export default function CanvasRevealHome() {
  return (
    <>
      <h2 className=" mt-20 text-center text-2xl md:text-4xl font-bold text-white tracking-tight mb-12">
        Explore os{" "}
        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
          Algoritmos de Criptografia
        </span>
      </h2>

      <div className="pb-20 mt-10 flex flex-col lg:flex-row items-center justify-center bg-[#111] text-white w-full gap-12 md:gap-4 mx-auto px-8">
        <Card
          to="/base64"
          title="Criptografia Base 64"
          icon={<AceternityIcon />}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-green-600 cursor-pointer"
          />
        </Card>
        <Card
          to="/sha256"
          title="Criptografia SHA-256"
          icon={<AceternityIcon />}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-red-800 cursor-pointer"
            colors={[[255, 0, 0]]}
          />
        </Card>

        <Card to="/rsa" title="Criptografia RSA" icon={<AceternityIcon />}>
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
  to,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  to: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  const { showLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleCardClick = () => {
    if (location.pathname === to) {
      return;
    }
    showLoading();
    navigate(to);
  };

  return (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault();
        handleCardClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 h-[30rem] relative overflow-hidden" // Adicionado overflow-hidden para a animação
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

      <AnimatePresence>
        {(hovered || isMobile) && (
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
        <div className="hidden text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto md:flex items-center justify-center">
          {icon}
        </div>
        <h2 className="opacity-100 text-white dark:text-white text-xl md:opacity-0 group-hover/canvas-card:opacity-100 relative z-10 md:text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </Link>
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
