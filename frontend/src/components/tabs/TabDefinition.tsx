"use client";
import React from "react";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";


export function TabDefinition() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>

              <p className={twMerge("text-xl mb-4")}>{item.title}</p>

              <div className="text-sm  prose prose-sm dark:prose-invert">
                {item?.image && (
                  <img
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "O que é Criptografia?",
    badge: "Definição",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=1950&q=80",
    description: (
      <>
        <p>
          Criptografia é uma técnica usada para proteger informações através da
          transformação de dados legíveis em códigos ininteligíveis. Apenas quem
          possui a chave certa consegue decifrar e entender a informação
          original.
        </p>
        <p>
          No mundo digital, ela é essencial para garantir a privacidade e a
          segurança em comunicações, sistemas bancários, armazenamento em nuvem
          e muito mais.
        </p>
      </>
    ),
  },
  {
    title: "Por que ela é importante?",
    badge: "Motivação",
    image:
      "https://revistasegurancaeletronica.com.br/wp-content/uploads/2022/04/hackers-modernos-e-a-reinvencao-da-seguranca.jpg",
    description: (
      <>
        <p>
          A criptografia protege dados contra acessos não autorizados. Ela
          garante:
          <strong> Confidencialidade</strong> (apenas o destinatário certo pode
          ler),
          <strong> Integridade</strong> (garantia de que os dados não foram
          alterados), e<strong> Autenticidade</strong> (certeza sobre a
          identidade de quem envia).
        </p>
        <p>
          Seja ao enviar uma mensagem no WhatsApp ou ao realizar uma compra
          online, a criptografia está por trás, tornando tudo mais seguro.
        </p>
      </>
    ),
  },
  {
    title: "Uma analogia simples",
    badge: "Exemplo prático",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: (
      <>
        <p>
          Imagine que você quer enviar uma carta para um amigo, mas não quer que
          ninguém leia no caminho. Você coloca a carta em um cofre, tranca com
          um cadeado e envia. Seu amigo tem a chave para abrir o cofre. Isso é
          criptografia!
        </p>
        <p>
          Esse processo de "trancar" e "destrancar" a informação é feito com
          algoritmos e chaves digitais.
        </p>
      </>
    ),
  },
  {
    title: "Onde a criptografia é usada?",
    badge: "Aplicações",
    image:
      "https://www.ecodebate.com.br/wp-content/uploads/2019/08/20190808-190808.jpg",
    description: (
      <>
        <p>
          A criptografia está presente em:
          <ul>
            <li>• Sites com HTTPS (cadeado no navegador)</li>
            <li>• Aplicativos de mensagens (ex: WhatsApp)</li>
            <li>• Cartões de crédito</li>
            <li>• Armazenamento em nuvem</li>
            <li>• Documentos digitais com assinatura eletrônica</li>
          </ul>
        </p>
        <p>Ou seja, você usa criptografia todos os dias, mesmo sem perceber.</p>
      </>
    ),
  },
  {
    title: "Tipos de criptografia",
    badge: "Classificações",
    image:
      "https://codebit.com.br/arquivo/44f8b6c7-7674-48bc-a54f-b9a134178507/cropped-image.jpg",
    description: (
      <>
        <p>Existem três tipos principais de criptografia:</p>
        <ul>
          <li>
            <strong>Criptografia Simétrica:</strong> mesma chave para
            criptografar e descriptografar.
          </li>
          <li>
            <strong>Criptografia Assimétrica:</strong> usa um par de chaves
            (pública e privada).
          </li>
          <li>
            <strong>Hashing:</strong> transforma dados em um código fixo, sem
            possibilidade de reversão.
          </li>
        </ul>
        <p>Cada uma tem sua aplicação específica e vantagens distintas.</p>
      </>
    ),
  },
];
