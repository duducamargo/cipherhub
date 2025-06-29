"use client";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-bream";
import { motion } from "framer-motion";


export function TabHistory() {
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
    title: "As origens da criptografia",
    badge: "Antiguidade",
    image:
      "https://www.researchgate.net/publication/354197235/figure/fig1/AS:11431281105296111@1670352667550/Figura-6-Modelo-de-desafio-envolvendo-a-cifra-de-Cesar-Fonte-Autoras.png",
    description: (
      <>
        <p>
          A criptografia existe há milênios. Um dos registros mais antigos é a{" "}
          <strong>escítala espartana</strong>, um bastão usado por soldados da
          Grécia Antiga para ocultar mensagens. Já no Egito, há registros de
          hieróglifos usados como códigos.
        </p>
        <p>
          O famoso imperador <strong>Júlio César</strong> também deixou sua
          marca com o "Cifra de César", onde letras eram deslocadas no alfabeto
          para esconder o verdadeiro conteúdo de uma mensagem.
        </p>
      </>
    ),
  },
  {
    title: "Criptografia na Idade Média",
    badge: "Mundo Árabe e Europa",
    image:
      "https://media.kasperskydaily.com/wp-content/uploads/sites/94/2015/09/06135343/vigenere-cipher-2.png",
    description: (
      <>
        <p>
          Na Idade Média, a criptografia evoluiu. O matemático árabe{" "}
          <strong>Al-Kindi</strong> desenvolveu o método de{" "}
          <em>análise de frequência</em> — base da criptoanálise, usado para
          quebrar códigos.
        </p>
        <p>
          Mais tarde, na Europa renascentista, surgiu a{" "}
          <strong>Cifra de Vigenère</strong>, que utilizava várias letras como
          chave e era considerada "inquebrável" por séculos.
        </p>
      </>
    ),
  },
  {
    title: "A era moderna da criptografia",
    badge: "Século XX",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/27/Enigma-plugboard.jpg",
    description: (
      <>
        <p>
          Durante a Segunda Guerra Mundial, a criptografia foi essencial. A
          máquina <strong>Enigma</strong>, usada pelos nazistas, foi decifrada
          por Alan Turing e sua equipe — um marco que ajudou a encurtar a guerra
          e impulsionou a computação moderna.
        </p>
        <p>
          Após a guerra, a criptografia começou a ser usada também em tempos de
          paz, principalmente por governos e grandes empresas.
        </p>
      </>
    ),
  },
  {
    title: "A revolução digital",
    badge: "Criptografia moderna",
    image:
      "https://invoice.com.br/wp-content/uploads/2024/05/240_F_702737528_gJGxSWIWILLUQOOyY3RpVDoEMmkter0A.jpg",
    description: (
      <>
        <p>
          Com o avanço da internet, a criptografia tornou-se uma parte
          fundamental da vida digital. Surgiram algoritmos como o{" "}
          <strong>RSA</strong> e o <strong>AES</strong>, usados para proteger
          dados em transações bancárias, e-mails e redes sociais.
        </p>
        <p>
          Hoje, navegamos por sites seguros (HTTPS), trocamos mensagens
          criptografadas e assinamos documentos digitais — tudo graças à
          criptografia moderna.
        </p>
      </>
    ),
  },
  {
    title: "Criptografia no futuro",
    badge: "Tendências",
    image:
      "https://itshow.com.br/wp-content/uploads/2025/02/portalitshow_A_futuristic_cybersecurity_design_featuring_a_gl_fef22de1-59b7-47c0-a30e-dc67906aecd4_1.png",
    description: (
      <>
        <p>
          Com a chegada dos computadores quânticos, os sistemas atuais de
          criptografia poderão ser quebrados em segundos. Isso está motivando o
          desenvolvimento da <strong>criptografia pós-quântica</strong>, pensada
          para resistir a essa nova era computacional.
        </p>
        <p>
          O futuro da segurança digital dependerá de algoritmos mais avançados,
          rápidos e confiáveis — e a criptografia continuará no centro dessa
          evolução.
        </p>
      </>
    ),
  },
];
