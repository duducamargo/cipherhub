/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DetailsCard } from "@/components/DetailsCard";
import { TabsRSA } from "@/components/layouts/TabsRSA";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLoading } from "@/contexts/LoadingContext";
import React, { useEffect, useState, useRef } from "react";
import { SendHorizonal, KeyRound, Lock } from "lucide-react"; 

interface ChatMessage {
  id: string;
  sender: "user" | "system";
  type: "text" | "encrypted" | "decrypted" | "error" | "info" | "static-keys";
  content: string;
  encryptedContent?: string;
  decryptedContent?: string;
  timestamp: Date;
}

export default function Rsa() {
  const { hideLoading } = useLoading();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      hideLoading();
    }, 500);
    return () => clearTimeout(timer);
  }, [hideLoading]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const [nKey, setNKey] = useState("");
  const [eKey, setEKey] = useState("");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...message, id: Date.now().toString(), timestamp: new Date() },
    ]);
  };

  const handleGenerateKeys = async () => {
    addMessage({
      sender: "user",
      type: "info",
      content: "Gerando novas chaves RSA...",
    });
    try {
      const response = await fetch("http://localhost:3001/rsa/generate-keys", {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar chaves no backend.");
      }
      const data = await response.json();
      setNKey(data.n);
      setEKey(data.e);
      // dKey é estático para descriptografia, então não precisamos setar o estado dKey aqui
      addMessage({
        sender: "system",
        type: "info",
        content: `Chaves geradas:\nN: ${data.n}\nE: ${data.e}\nD: ${data.d}`,
      });
    } catch (error: any) {
      console.error("Erro ao gerar chaves:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro ao gerar chaves: ${
          error.message || "Não foi possível conectar ao servidor."
        }`,
      });
    }
  };

  const handleProcessMessage = async () => {
    const messageToSend = inputMessage.trim();
    if (!messageToSend) return;

    addMessage({ sender: "user", type: "text", content: messageToSend });
    setInputMessage("");

    let usedNKey: string;
    let usedEKey: string;
    let usedDKey: string = ""; 

    usedNKey = nKey;
    usedEKey = eKey;

    if (!usedNKey || !usedEKey) {
      addMessage({
        sender: "system",
        type: "error",
        content: "Erro: N e E são necessários para criptografar.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/rsa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageToSend,
          n: usedNKey,
          e: usedEKey,
          d: usedDKey, 
          mode: "encrypt", 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erro desconhecido ao processar no backend."
        );
      }

      const data = await response.json();

      if (data.encrypt) {
        addMessage({
          sender: "system",
          type: "encrypted",
          content: "Mensagem criptografada:",
          encryptedContent: `[${data.encrypt.join(", ")}]`,
          decryptedContent: messageToSend, 
        });
      } else {
        addMessage({
          sender: "system",
          type: "error",
          content: "Erro: Resposta de criptografia inválida.",
        });
      }
    } catch (error: any) {
      console.error("Erro na comunicação com o backend:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro: ${
          error.message || "Não foi possível conectar ao servidor."
        }`,
      });
    }
  };

  const testimonials = [
    {
      quote:
        "RSA é um pilar da nossa infraestrutura de segurança. Utilizamos criptografia RSA para troca segura de chaves simétricas durante a negociação TLS, garantindo que nossos usuários iniciem conexões HTTPS com privacidade e autenticidade.",
      name: "Cloudflare",
      title: "Negociação de chaves em conexões HTTPS (TLS)",
    },
    {
      quote:
        "No processo de assinatura digital, aplicamos o RSA para garantir que mensagens e documentos eletrônicos transmitidos entre instituições financeiras sejam autênticos e inalterados, assegurando a integridade de cada transação.",
      name: "Banco do Brasil",
      title: "Assinaturas digitais em transações financeiras",
    },
    {
      quote:
        "RSA é utilizado em nossos dispositivos de autenticação multifactor para validar a identidade dos usuários. As chaves públicas são armazenadas nos servidores e usadas para verificar tokens assinados localmente nos dispositivos.",
      name: "Yubico",
      title: "Verificação de identidade em autenticação de dois fatores",
    },
    {
      quote:
        "Durante a transmissão de arquivos confidenciais entre sistemas internos e parceiros externos, usamos RSA para criptografar as chaves de sessão AES. Isso garante que somente o destinatário autorizado possa acessar o conteúdo.",
      name: "Siemens",
      title: "Criptografia de chaves de sessão para transferência de arquivos",
    },
    {
      quote:
        "Integramos RSA em nossa cadeia de certificados para proteger a comunicação entre sistemas industriais e a nuvem. A infraestrutura de chave pública garante que dispositivos autenticados troquem dados com total confiança.",
      name: "Schneider Electric",
      title: "Autenticação de dispositivos via PKI em IoT industrial",
    },
  ];

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
      <div className="w-full max-w-3xl bg-neutral-900 rounded-lg shadow-xl overflow-hidden flex flex-col h-[70vh] border border-neutral-700">
        <div className="p-4 border-b border-neutral-800 bg-neutral-800 flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="n-key"
                className="text-xs font-semibold text-neutral-300"
              >
                N (Módulo)
              </label>
              <input
                id="n-key"
                type="text"
                className="w-full p-2 rounded bg-neutral-700 text-white outline-none text-sm border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                value={nKey}
                onChange={(e) => setNKey(e.target.value)}
                placeholder="Insira o valor de N"
                // disabled={currentMode === "decrypt"} // Não precisa mais, sempre 'encrypt'
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="e-key"
                className="text-xs font-semibold text-neutral-300"
              >
                E (Pública)
              </label>
              <input
                id="e-key"
                type="text"
                className="w-full p-2 rounded bg-neutral-700 text-white outline-none text-sm border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                value={eKey}
                onChange={(e) => setEKey(e.target.value)}
                placeholder="Insira o valor de E"
              />
            </div>
            {/* REMOVIDO: Bloco de chaves estáticas de descriptografia */}
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors transform hover:scale-[1.01] active:scale-95"
            onClick={handleGenerateKeys}
          >
            <KeyRound className="inline-block mr-2" size={18} /> Gerar Chaves
          </button>
        </div>
        {/* Área de Mensagens do Chat */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto no-visible-scrollbar bg-neutral-900 shadow-inner rounded-b-lg"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-xl shadow-lg border ${
                  msg.sender === "user"
                    ? "bg-purple-700 text-white border-purple-600 rounded-br-none"
                    : "bg-neutral-700 text-neutral-200 border-neutral-600 rounded-bl-none"
                } ${
                  msg.type === "error"
                    ? "bg-red-800 text-white border-red-700"
                    : msg.type === "info"
                    ? "bg-blue-800 text-white border-blue-700"
                    : msg.type === "static-keys"
                    ? "bg-green-800 text-white border-green-700"
                    : "" // Novo tipo de mensagem
                }`}
              >
                <p className="font-bold text-sm mb-1 opacity-90">
                  {msg.sender === "user" ? "Você" : "Sistema"}
                </p>
                <p className="text-sm break-words whitespace-pre-wrap">
                  {msg.content}
                </p>
                {/* Bloco de Mensagem Criptografada */}
                {msg.type === "encrypted" && msg.encryptedContent && (
                  <div className="mt-3 pt-3 border-t border-dashed border-purple-500">
                    {" "}
                    {/* Linha pontilhada */}
                    <p className="text-xs font-semibold text-purple-200 mb-1 flex items-center">
                      <Lock size={14} className="inline-block mr-1" />{" "}
                      Criptografado:
                    </p>
                    <p className="font-mono text-xs break-all bg-purple-900/50 p-2 rounded-md">
                      {msg.encryptedContent}
                    </p>
                    <p className="mt-2 text-xs text-neutral-300">
                      Original:{" "}
                      <span className="font-mono">{msg.decryptedContent}</span>
                    </p>
                  </div>
                )}
                {/* REMOVIDO: Bloco de Mensagem Descriptografada */}
                <p className="text-right text-xs text-neutral-400 mt-2">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Área de Entrada do Chat */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-800 flex items-center gap-3">
          {/* REMOVIDO: Botões de "Criptografar" / "Descriptografar" */}
          <input
            type="text"
            className="flex-1 p-3 rounded-lg bg-neutral-700 text-white outline-none border border-neutral-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm shadow-inner"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleProcessMessage();
              }
            }}
            placeholder="Digite a mensagem para criptografar..." // Placeholder fixo
          />
          <button
            className="p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all transform hover:scale-[1.05] active:scale-95 shadow-md shadow-pink-900/50"
            onClick={handleProcessMessage}
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
      <TabsRSA />
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
