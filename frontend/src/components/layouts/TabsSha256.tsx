"use client";

import { Tabs } from "../ui/tabs";
import { TabSha256Code } from "../tabs/TabSha256Code";
import { TabSha256Definition } from "../tabs/TabSha256Definition";

export function TabsSha256() {
  const tabs = [
    {
      title: "Definição",
      value: "definicao",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl py-10 px-4 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabSha256Definition />
        </div>
      ),
    },
    {
      title: "Código SHA-256",
      value: "codigo-sha256",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl py-10 px-0 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-violet-900">
          <TabSha256Code />
        </div>
      ),
    },

  ];

  return (
    <div className="h-[145rem] md:h-[125rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-8 mb-20">
      <Tabs tabs={tabs} hoverTop={-140}/>
    </div>
  );
}


