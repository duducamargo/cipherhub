"use client";

import { Tabs } from "../components/ui/tabs";
import { TabHistory } from "./TabHistory";

export function TabsHome() {
  const tabs = [
    {
      title: "Definição",
      value: "definicao",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
    {
      title: "História",
      value: "historia",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
    {
      title: "Criptografia Simétrica",
      value: "criptografia-simetrica",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
    {
      title: "Criptografia Assimétrica",
      value: "criptografia-assimetrica",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[145rem] md:h-[155rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-24">
      <Tabs tabs={tabs} />
    </div>
  );
}


