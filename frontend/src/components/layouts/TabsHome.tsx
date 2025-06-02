"use client";

import { Tabs } from "../ui/tabs";
import { TabDefinition } from "../TabDefinition";
import { TabHistory } from "../TabHistory";
import { TabSymetricEncryption } from "../TabSymmetricEncryption";
import { TabAssymetricEncryption } from "../TabAssymmetricEncryption";

export function TabsHome() {
  const tabs = [
    {
      title: "Definição",
      value: "definicao",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabDefinition />
        </div>
      ),
    },
    {
      title: "História",
      value: "historia",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabHistory />
        </div>
      ),
    },
    {
      title: "Criptografia Simétrica",
      value: "criptografia-simetrica",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabSymetricEncryption />
        </div>
      ),
    },
    {
      title: "Criptografia Assimétrica",
      value: "criptografia-assimetrica",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabAssymetricEncryption />
        </div>
      ),
    },

  ];

  return (
    <div className="h-[225rem] md:h-[210rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-24">
      <Tabs tabs={tabs} />
    </div>
  );
}


