"use client";

import { Tabs } from "../ui/tabs";
import { TabRSACode } from "../tabs/TabRSACode";
import { TabRSADefinition } from "../tabs/TabRSADefinition";

export function TabsRSA() {
  const tabs = [
    {
      title: "Definição",
      value: "definicao",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabRSADefinition />
        </div>
      ),
    },
    {
      title: "Código RSA",
      value: "codigo-rsa",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabRSACode />
        </div>
      ),
    },

  ];

  return (
    <div className="h-[120em] md:h-[115rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-8 mb-20">
      <Tabs tabs={tabs} hoverTop={-130}/>
    </div>
  );
}


