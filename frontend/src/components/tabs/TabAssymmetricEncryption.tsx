"use client";
import React from "react";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";

export function TabAssymetricEncryption() {
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
    title: "O que é Criptografia Assimétrica?",
    badge: "Definição",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1950&q=80",
    description: (
      <>
        <p>
          A criptografia assimétrica é um método de proteção de dados baseado no
          uso de duas chaves diferentes, porém matematicamente relacionadas: uma
          chave pública e uma chave privada. Diferente da criptografia
          simétrica, onde a mesma chave é compartilhada entre as partes, aqui
          cada pessoa possui seu próprio par de chaves.
        </p>
        <p>
          A chave pública é distribuída livremente e usada para criptografar
          dados. Já a chave privada, mantida em segredo, é a única capaz de
          descriptografar a informação. Isso garante que qualquer um possa
          enviar mensagens seguras, mas apenas o destinatário poderá ler.
        </p>
        <p>
          Essa técnica é amplamente utilizada em ambientes onde as partes não se
          conhecem previamente, como na internet, pois elimina a necessidade de
          trocar senhas com antecedência.
        </p>
      </>
    ),
  },
  {
    title: "Como funciona o par de chaves?",
    badge: "Funcionamento",
    image:
      "https://www.scunna.com/wp-content/uploads/2023/12/criptografia2.jpg",
    description: (
      <>
        <p>
          A base da criptografia assimétrica está na geração de dois componentes
          interdependentes: a chave pública e a chave privada. Embora estejam
          matematicamente ligadas, é praticamente impossível derivar uma a
          partir da outra em um tempo viável, mesmo com computadores potentes.
        </p>
        <ul>
          <li>
            • A <strong>chave pública</strong> é disponibilizada abertamente e
            usada por qualquer um que queira enviar uma informação segura.
          </li>
          <li>
            • A <strong>chave privada</strong> deve ser protegida, pois é ela
            que permite a leitura das mensagens recebidas.
          </li>
        </ul>
        <p>
          Esse sistema garante <strong>confidencialidade</strong>,{" "}
          <strong>autenticidade</strong> (com assinaturas digitais) e{" "}
          <strong>integridade</strong> dos dados. Além disso, como o remetente
          não precisa conhecer previamente o destinatário, é uma solução
          extremamente escalável e versátil.
        </p>
        <p>
          Em operações como autenticação digital, o processo é invertido: algo
          assinado com a chave privada pode ser verificado por qualquer um
          usando a chave pública, garantindo que o conteúdo veio do verdadeiro
          autor.
        </p>
      </>
    ),
  },
  {
    title: "Exemplos de Algoritmos Assimétricos",
    badge: "Algoritmos populares",
    image:
      "https://www.digicert.com/content/dam/digicert/images/resources/faqs/asymmetric-encryption-pt.png",
    description: (
      <>
        <p>
          A criptografia assimétrica é implementada por meio de algoritmos
          robustos que utilizam fundamentos matemáticos como fatoração de
          grandes números primos ou propriedades de curvas elípticas. Os
          principais são:
        </p>
        <ul>
          <li>
            <strong>RSA (Rivest–Shamir–Adleman):</strong> Um dos algoritmos mais
            antigos e amplamente utilizados. Baseia-se na dificuldade de fatorar
            números inteiros muito grandes.
          </li>
          <li>
            <strong>ECC (Elliptic Curve Cryptography):</strong> Uma alternativa
            moderna ao RSA, oferece o mesmo nível de segurança com tamanhos de
            chave menores, o que o torna ideal para dispositivos móveis ou com
            poucos recursos.
          </li>
          <li>
            <strong>ElGamal:</strong> Usado em assinaturas digitais e troca de
            chaves seguras, é baseado na dificuldade do problema do logaritmo
            discreto.
          </li>
        </ul>
        <p>
          Cada algoritmo tem pontos fortes distintos. Por exemplo, o RSA é
          confiável e bem documentado, enquanto o ECC é mais leve e eficiente,
          especialmente para sistemas embarcados e IoT.
        </p>
      </>
    ),
  },
  {
    title: "Aplicações no dia a dia",
    badge: "Casos de uso",
    image:
      "https://dhg1h5j42swfq.cloudfront.net/2022/11/07211315/criptografiaassimetrica.png",
    description: (
      <>
        <p>
          A criptografia assimétrica é usada em diversas tecnologias modernas
          que envolvem comunicação segura e autenticação. Alguns exemplos
          práticos incluem:
        </p>
        <ul>
          <li>
            • <strong>Certificados digitais (HTTPS):</strong> Garantem que um
            site é legítimo e seguro para transações.
          </li>
          <li>
            • <strong>Assinaturas digitais:</strong> Usadas para validar
            documentos eletrônicos, como contratos e notas fiscais.
          </li>
          <li>
            • <strong>Troca de chaves em conexões seguras:</strong> Parte
            fundamental de protocolos como TLS/SSL.
          </li>
          <li>
            • <strong>E-mails criptografados:</strong> Garantem privacidade em
            mensagens confidenciais.
          </li>
        </ul>
        <p>
          Além disso, a criptografia assimétrica é parte essencial de carteiras
          de criptomoedas, autenticação em sistemas de login e proteção de dados
          em bancos, hospitais e órgãos governamentais.
        </p>
        <p>
          Em um mundo cada vez mais conectado, esse tipo de criptografia é uma
          peça-chave na construção da confiança digital.
        </p>
      </>
    ),
  },
];
