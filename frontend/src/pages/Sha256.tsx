"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HyperText } from "@/components/ui/hyper-text";
import { DetailsCard } from "@/components/DetailsCard";
import { TabsSha256 } from "@/components/layouts/TabsSha256";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";

export default function Sha256() {
  const { hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  const testimonials = [
    {
      quote:
        "O algoritmo SHA-256 é usado em todos os blocos minerados em nossa blockchain. Ele garante a integridade dos dados e a imutabilidade do histórico de transações, formando a base da confiança na rede.",
      name: "Bitcoin",
      title: "Geração de hashes em blocos de blockchain",
    },
    {
      quote:
        "Empregamos SHA-256 para armazenar senhas de forma segura em nossa plataforma. Mesmo em caso de violação, os dados permanecem protegidos, já que os hashes não podem ser revertidos para o texto original.",
      name: "GitHub",
      title: "Hashing seguro de senhas de usuário",
    },
    {
      quote:
        "SHA-256 é utilizado em nossos pipelines de CI/CD para verificar a integridade dos pacotes baixados e assegurar que os artefatos de build não foram corrompidos ou alterados durante o transporte.",
      name: "GitLab",
      title: "Verificação de integridade de artefatos em CI/CD",
    },
    {
      quote:
        "Nosso sistema de assinatura digital usa SHA-256 para gerar resumos criptográficos dos documentos, garantindo que qualquer modificação seja detectada antes da verificação da assinatura.",
      name: "Adobe",
      title: "Resumo de documentos para assinatura digital",
    },
    {
      quote:
        "Para evitar colisões e falsificações, utilizamos SHA-256 no versionamento de arquivos distribuídos entre servidores e datacenters. Isso nos permite verificar rapidamente se o conteúdo foi alterado ou comprometido.",
      name: "Amazon Web Services",
      title: "Controle de integridade em sistemas distribuídos",
    },
  ];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleProcess = async () => {
    try {
      const response = await axios.post("http://localhost:3001/sha256", {
        text: input,
      });

      console.log("Resposta da API:", response.data.result);
      setOutput(response.data.result);
    } catch (error) {
      console.error("Erro ao processar:", error);
      setOutput("Erro ao se comunicar com a API.");
    }
  };

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

      <div className="flex gap-6 flex-col md:flex-row w-full max-w-5xl mb-12">
        {/* Entrada */}
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg">
          <label className="block text-sm font-semibold mb-2">
            Texto de entrada:
          </label>
          <textarea
            className="w-full h-48 p-3 rounded bg-neutral-800 text-white resize-none outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o texto aqui..."
          ></textarea>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 bg-purple-600 text-white cursor-pointer hover:bg-purple-700 outline-none`}
            >
              Codificar
            </button>
            <button
              className="sm:ml-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer outline-none"
              onClick={handleProcess}
            >
              Processar
            </button>
          </div>
        </div>

        {/* Resultado */}
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg md:max-w-[479px]">
          <label className="block text-sm font-semibold mb-2">Resultado:</label>
          <div className="w-full max-w-[479px] h-48 p-3 rounded bg-neutral-800 text-white overflow-auto">
            {output ? (
              <HyperText
                className="max-w-[479px] break-words"
                startOnView={true}
                animateOnHover={false}
                duration={1000}
                characterSet={"0123456789abcdef".split("")}
              >
                {output}
              </HyperText>
            ) : (
              <p className="text-neutral-500">
                O resultado será exibido aqui...
              </p>
            )}
          </div>
        </div>
      </div>

      <TabsSha256 />

      <div className="mt-12 h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="h-fit w-full rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
