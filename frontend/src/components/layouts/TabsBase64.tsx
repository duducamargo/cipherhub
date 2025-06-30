"use client";

import { Tabs } from "../ui/tabs";
import { TabBase64Definition } from "../tabs/TabBase64Definition";
import { TabBase64Code } from "../tabs/TabBase64Code";

export function TabsBase64() {
  const tabs = [
    {
      title: "Definição",
      value: "definicao",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabBase64Definition />
        </div>
      ),
    },
    {
      title: "Código Base 64",
      value: "codigo-base64",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabBase64Code />
        </div>
      ),
    },

  ];

  return (
    <div className="h-[120em] md:h-[105rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-8 mb-20">
      <Tabs tabs={tabs} hoverTop={-120}/>
    </div>
  );
}


