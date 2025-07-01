/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
// Remover axios
import { DetailsCard } from "@/components/DetailsCard";
import { TabsBase64 } from "@/components/layouts/TabsBase64";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";

// Novos imports modularizados
import { base64Testimonials } from "@/lib/base64-testimonials"; 
import { useBase64Logic } from "@/hooks/useBase64Logic"; 
import { Base64Converter } from "@/components/base64/Base64Converter";

export default function Base64() {
  const { hideLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => {
      hideLoading();
    }, 500);
  }, [hideLoading]);

  const { input, setInput, output, mode, setMode, handleProcess } =
    useBase64Logic();

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl h-[45px] mt-20 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Algoritmo Base64
      </h1>

      <DetailsCard
        algorithmName="Base64"
        algorithmType="Codificação (não criptográfica)"
        structure="Transformação binária para texto ASCII usando blocos de 6 bits"
        isReversible={true}
        implementationDifficulty="Dificuldade Baixa"
        commonUses="Envio de dados binários via texto (e.g., e-mails, URLs), armazenamento de imagens"
        securityLevel={2}
      />

      <h2 className="text-3xl mt-4 md:text-4xl font-bold mb-16 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Conversor Base64
      </h2>

      <Base64Converter
        input={input}
        setInput={setInput}
        output={output}
        mode={mode}
        setMode={setMode}
        handleProcess={handleProcess}
      />

      <TabsBase64 />

      <div className="mt-12 h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={base64Testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={base64Testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
