"use client";

import { useEffect } from "react";
import { DetailsCard } from "@/components/DetailsCard";
import { TabsSha256 } from "@/components/layouts/TabsSha256";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";

import { sha256Testimonials } from "@/lib/sha256-testimonials";
import { useSha256Logic } from "@/hooks/useSha256Logic";
import { Sha256Converter } from "@/components/sha256/Sha256Converter";

export default function Sha256() {
  const { hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  const { input, setInput, output, handleProcess } = useSha256Logic();

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl h-[45px] mt-20 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Algoritmo Sha-256
      </h1>

      <DetailsCard
        algorithmName="SHA-256"
        algorithmType="Hash criptográfico (One-way)"
        structure="Função de dispersão baseada em operações lógicas, rotação e adição modular"
        isReversible={false}
        implementationDifficulty="Dificuldade Alta"
        commonUses="Assinaturas digitais, blockchain, verificação de integridade"
        securityLevel={5}
      />

      <h2 className="text-3xl mt-4 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Conversor Sha-256
      </h2>

      <Sha256Converter
        input={input}
        setInput={setInput}
        output={output}
        handleProcess={handleProcess}
      />

      <TabsSha256 />

      <div className="mt-12 h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={sha256Testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        {/* Usando os testimonials importados */}
        <InfiniteMovingCards
          items={sha256Testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
