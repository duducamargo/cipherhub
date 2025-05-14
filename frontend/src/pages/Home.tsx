"use client";

import HomeTitle from "../components/layouts/HomeTitle";
import CanvasRevealHome from "../components/layouts/CanvasRevealHome";
import { TabsHome } from "@/components/layouts/TabsHome";

export default function App() {
  return (
    <div className="bg-[#111] text-white w-full min-h-screen flex flex-col items-center justify-center">

      <HomeTitle />

      <TabsHome />
      
      <CanvasRevealHome />
    </div>
  );
};
