"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HyperText } from "@/components/ui/hyper-text";
import { DetailsCard } from "@/components/DetailsCard";
import { TabsBase64 } from "@/components/layouts/TabsBase64";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";

export default function Base64() {
  const { hideLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => {
      hideLoading();
    }, 500); 
  }, [hideLoading]);

  const testimonials = [
    {
      quote:
        "Usamos codificação Base64 para transmitir dados binários, como imagens e anexos, através de APIs REST que exigem compatibilidade com formato de texto. Essa abordagem garante integridade na transferência sem depender de arquivos temporários ou headers complexos.",
      name: "Google",
      title: "Transmissão de imagens via APIs REST",
    },
    {
      quote:
        "A Base64 é fundamental em nosso sistema de autenticação. Tokens de acesso são gerados e incluídos nos headers de requisição em formato Base64, assegurando compatibilidade com protocolos HTTP e facilitando a leitura e validação segura dos dados no backend.",
      name: "Auth0",
      title: "Codificação de tokens de autenticação",
    },
    {
      quote:
        "Durante o envio de e-mails com anexos em nosso serviço, utilizamos codificação Base64 para transformar arquivos binários em texto ASCII. Isso evita a corrupção dos dados e garante compatibilidade com todos os clientes de e-mail.",
      name: "SendGrid",
      title: "Envio de anexos em e-mails",
    },
    {
      quote:
        "Implementamos Base64 em nosso sistema de QR Codes para embutir dados binários criptografados como strings legíveis, facilitando o transporte seguro de credenciais em ambientes de baixa largura de banda e sem conexões constantes.",
      name: "IBM",
      title: "Codificação de dados em QR Codes para credenciais seguras",
    },
    {
      quote:
        "Em sistemas legados, usamos Base64 para serializar e persistir imagens em campos de texto de bancos de dados SQL. Apesar de não ser ideal para grandes arquivos, a técnica mantém compatibilidade com antigos sistemas que não aceitam blobs binários.",
      name: "Oracle",
      title: "Serialização de imagens em bases de dados legadas",
    },
  ];

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = async () => {
    if (mode === "encode") {
      try {
        const response = await axios.post(
          "http://localhost:3001/base64/encode",
          {
            text: input,
          }
        );

        console.log("Resposta da API:", response.data.result);
        setOutput(response.data.result);
      } catch (error) {
        console.error("Erro ao processar:", error);
        setOutput("Erro ao se comunicar com a API.");
      }
    } else if (mode === "decode") {
      try {
        const response = await axios.post(
          "http://localhost:3001/base64/decode",
          {
            text: input,
          }
        );

        console.log("Resposta da API:", response.data.result);
        setOutput(response.data.result);
      } catch (error) {
        console.error("Erro ao processar:", error);
        setOutput("Erro ao se comunicar com a API.");
      }
    } else {
      setOutput("Modo inválido. Selecione codificar ou decodificar.");
    }
  };

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
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "encode"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("encode")}
            >
              Codificar
            </button>
            <button
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "decode"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("decode")}
            >
              Decodificar
            </button>
            <button
              className="sm:ml-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
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
                startOnView={false}
                animateOnHover={false}
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

      <TabsBase64 />

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
