"use client";

import HomeTitle from "../components/HomeTitle";
import CanvasRevealHome from "../components/CanvasRevealHome";

export default function App() {
  return (
    <div className="bg-[#111] text-white w-full min-h-screen flex flex-col items-center justify-center">

      <HomeTitle />
      
      <CanvasRevealHome />
    </div>
  );
};
