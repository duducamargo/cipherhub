"use client";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";

export function TabBase64Definition() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {base64Content.map((item, index) => (
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

const base64Content = [
  {
    title: "O que é o algoritmo Base64?",
    badge: "Definição",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=1950&q=80",
    description: (
      <>
        <p>
          <strong>Base64</strong> é um algoritmo de codificação usado para
          transformar dados binários em uma representação textual. Ele é muito
          utilizado para transmitir informações em ambientes que lidam apenas
          com texto, como e-mails ou URLs.
        </p>
        <p>
          A codificação Base64 converte blocos de 3 bytes (24 bits) em 4
          caracteres ASCII, escolhidos de uma tabela com 64 símbolos (daí o
          nome). Isso permite representar qualquer dado binário como texto
          seguro.
        </p>
        <p>
          É importante notar que o Base64 <strong>não é criptografia</strong>,
          já que não protege a confidencialidade da informação — é apenas uma
          forma de codificação.
        </p>
      </>
    ),
  },
  {
    title: "Passo a passo da codificação Base64",
    badge: "Passo a Passo",
    image:
      "https://itshow.com.br/wp-content/uploads/2025/02/portalitshow_A_futuristic_cybersecurity_design_featuring_a_gl_fef22de1-59b7-47c0-a30e-dc67906aecd4_1.png",

    description: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Obtenha os dados de entrada:</strong> inicie com uma string
            ou sequência de bytes. Ex: <code>"ABC"</code>.
          </li>
          <li>
            <strong>Converta para binário:</strong> transforme cada caractere em
            seu valor binário de 8 bits (ASCII). Ex: A (65) → 01000001.
          </li>
          <li>
            <strong>Agrupe os bits:</strong> agrupe os bits em blocos de 24 bits
            (3 bytes). Se os dados não tiverem múltiplos de 3 bytes, adicione
            zeros à direita.
          </li>
          <li>
            <strong>Divida em blocos de 6 bits:</strong> quebre os 24 bits em 4
            blocos de 6 bits. Ex: 010000 010100 001101 000000.
          </li>
          <li>
            <strong>Mapeie para a tabela Base64:</strong> use os 6 bits como
            índice para acessar os caracteres da tabela Base64 padrão.
          </li>
          <li>
            <strong>Adicione padding:</strong> se a entrada original não era
            múltipla de 3 bytes, adicione <code>=</code> ou <code>==</code> ao
            final para completar a saída.
          </li>
        </ol>
        <p className="mt-4">
          Em JavaScript, você pode usar <code>btoa("sua string")</code> para
          codificar e <code>atob("código base64")</code> para decodificar. Em
          Python,
          <code> base64.b64encode()</code> e <code>base64.b64decode()</code> da
          biblioteca padrão fazem o mesmo.
        </p>
      </>
    ),
  },
];
