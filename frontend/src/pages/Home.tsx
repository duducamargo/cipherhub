import { useEffect } from "react";
import HomeTitle from "../components/layouts/HomeTitle";
import CanvasRevealHome from "@/components/layouts/CanvasRevealHome";
import { TabsHome } from "@/components/layouts/TabsHome";
import { motion } from "framer-motion";
import { useLoading } from "../contexts/LoadingContext"; 

export default function Home() {
  const { hideLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => {
      hideLoading();
    }, 500);
    hideLoading();

  }, [hideLoading]); 

  return (
    <div className="bg-[#111] text-white w-full min-h-screen flex flex-col items-center justify-center space-y-12">
      <HomeTitle />

      <TabsHome />

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CanvasRevealHome />
      </motion.div>
    </div>
  );
}
