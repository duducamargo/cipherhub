"use client";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";

export function TabRSADefinition() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {rsaContent.map((item, index) => (
          <motion.div
            key={index}
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

              <div className="text-sm prose prose-sm dark:prose-invert">
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

const rsaContent = [
  {
    title: "O que é o algoritmo RSA?",
    badge: "Definição",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: (
      <>
        <p>
          O <strong>RSA</strong> é um dos algoritmos de criptografia assimétrica
          mais utilizados no mundo. Ele foi criado em 1977 por Rivest, Shamir e
          Adleman e é baseado na dificuldade de fatorar números grandes.
        </p>
        <p>
          Diferente da criptografia simétrica (que usa uma única chave), o RSA
          utiliza um <strong>par de chaves</strong>: uma chave pública (para
          criptografar) e uma chave privada (para descriptografar). Isso permite
          comunicação segura sem a necessidade de trocar uma chave secreta
          previamente.
        </p>
        <p>
          O RSA é amplamente utilizado em <strong>assinaturas digitais</strong>,{" "}
          <strong>comunicação segura (HTTPS)</strong> e{" "}
          <strong>troca de chaves criptográficas</strong>.
        </p>
      </>
    ),
  },
  {
    title: "Passo a passo da implementação do RSA",
    badge: "Passo a Passo",
    image:
      "https://itshow.com.br/wp-content/uploads/2025/02/portalitshow_A_futuristic_cybersecurity_design_featuring_a_gl_fef22de1-59b7-47c0-a30e-dc67906aecd4_1.png",
    description: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Escolher dois números primos grandes:</strong> denotados por{" "}
            <code>p</code> e <code>q</code>. Ex: 61 e 53 (para testes).
          </li>
          <li>
            <strong>
              Calcular <code>n = p × q</code>:
            </strong>{" "}
            esse será o módulo utilizado na chave pública e privada.
          </li>
          <li>
            <strong>
              Calcular <code>φ(n) = (p - 1)(q - 1)</code>:
            </strong>{" "}
            função totiente de Euler, usada na geração das chaves.
          </li>
          <li>
            <strong>
              Escolher o expoente público <code>e</code>:
            </strong>{" "}
            valor coprimo com <code>φ(n)</code>, geralmente <code>65537</code>{" "}
            por convenção.
          </li>
          <li>
            <strong>
              Calcular o inverso modular <code>d</code>:
            </strong>{" "}
            tal que <code>(d × e) mod φ(n) = 1</code>. Este será o expoente da
            chave privada.
          </li>
          <li>
            <strong>Gerar as chaves:</strong>
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                <strong>Chave pública:</strong> par <code>(e, n)</code>
              </li>
              <li>
                <strong>Chave privada:</strong> par <code>(d, n)</code>
              </li>
            </ul>
          </li>
          <li>
            <strong>Para criptografar:</strong> <code>c = m^e mod n</code>, onde{" "}
            <code>m</code> é a mensagem original convertida em número e{" "}
            <code>c</code> é o texto cifrado.
          </li>
          <li>
            <strong>Para descriptografar:</strong> <code>m = c^d mod n</code>,
            revertendo a mensagem ao seu estado original.
          </li>
        </ol>
        <p className="mt-4">
          O RSA pode ser implementado em diversas linguagens como C, Python,
          JavaScript ou usando bibliotecas como <code>crypto</code> (Node.js) e{" "}
          <code>pycryptodome</code> (Python).
        </p>
      </>
    ),
  },
];
