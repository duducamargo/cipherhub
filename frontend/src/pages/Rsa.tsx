// src/pages/Rsa.tsx
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DetailsCard } from "@/components/DetailsCard";
import { TabsRSA } from "@/components/layouts/TabsRSA";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";
import React, { useEffect } from "react";

import { useChatMessages } from "@/hooks/useChatMessages";
import { useRsaLogic } from "@/hooks/useRsaLogic";
import { RsaChatContainer } from "@/components/rsa/RsaChatContainer";

import { rsaTestimonials } from "@/lib/rsa-testimonials";

export default function Rsa() {
  const { hideLoading } = useLoading();
  const { messages, addMessage, chatContainerRef } = useChatMessages();

  const {
    nKey,
    setNKey,
    eKey,
    setEKey,
    inputMessage,
    setInputMessage,
    currentMode,
    setCurrentMode,
    handleGenerateKeys,
    handleProcessMessage,
  } = useRsaLogic(addMessage);

  useEffect(() => {
    const timer = setTimeout(() => {
      hideLoading();
    }, 500);
    return () => clearTimeout(timer);
  }, [hideLoading]);


  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl h-[45px] mt-20 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Algoritmo RSA
      </h1>

      <DetailsCard
        algorithmName="RSA"
        algorithmType="Criptografia Assimétrica"
        structure="Chaves pública e privada com base em fatoração de primos"
        isReversible={true}
        implementationDifficulty="Dificuldade Média/Alta, especialmente para gerar chaves e operar com grandes primos"
        commonUses="Troca segura de chaves, assinatura digital, comunicação segura"
        securityLevel={4}
      />

      <h2 className="text-3xl mt-4 md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        RSA Chat
      </h2>
      <RsaChatContainer
        nKey={nKey}
        setNKey={setNKey}
        eKey={eKey}
        setEKey={setEKey}
        handleGenerateKeys={handleGenerateKeys}
        currentMode={currentMode}
        messages={messages}
        chatContainerRef={chatContainerRef}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        setCurrentMode={setCurrentMode}
        handleProcessMessage={handleProcessMessage}
      />

      <TabsRSA />
      <div className="mt-12 h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={rsaTestimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={rsaTestimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
