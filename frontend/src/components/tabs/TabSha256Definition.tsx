"use client";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";

export function TabSha256Definition() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {sha256Content.map((item, index) => (
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

const sha256Content = [
  {
    title: "O que é o algoritmo SHA-256?",
    badge: "Definição",
    image:
      "https://cdn.pixabay.com/photo/2025/04/23/17/33/shield-9553554_1280.jpg",

    description: (
      <>
        <p>
          O <strong>SHA-256</strong> (Secure Hash Algorithm 256 bits) é uma
          função de hash criptográfica da família SHA-2. Ela transforma uma
          mensagem de qualquer tamanho em uma saída fixa de 256 bits (ou 64
          caracteres hexadecimais).
        </p>
        <p>
          O SHA-256 é uma função <strong>unidirecional</strong>: não é possível
          reverter o hash para obter a mensagem original. Ele também é sensível
          à entrada — uma pequena alteração no texto gera um hash completamente
          diferente.
        </p>
        <p>
          Ele é amplamente utilizado em aplicações de segurança digital como
          <strong> blockchain</strong>, <strong>assinaturas digitais</strong>,
          <strong>verificação de integridade</strong> e{" "}
          <strong>armazenamento seguro de senhas</strong>.
        </p>
      </>
    ),
  },
  {
    title: "Passo a passo da implementação do SHA-256",
    badge: "Passo a Passo",
    image:
      "https://cdn.pixabay.com/photo/2020/03/06/13/55/security-4907127_1280.jpg",

    description: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Converter a mensagem em binário:</strong> transforme a
            entrada (ex: string) para uma sequência binária usando codificação
            ASCII.
          </li>
          <li>
            <strong>Adicionar bit '1':</strong> anexe o bit 1 ao final da
            mensagem. Isso marca o fim da mensagem original.
          </li>
          <li>
            <strong>Preencher com zeros:</strong> adicione bits '0' até que o
            comprimento total seja 64 bits a menos que um múltiplo de 512 (i.e.
            total ≡ 448 mod 512).
          </li>
          <li>
            <strong>Anexar o comprimento original:</strong> adicione 64 bits no
            final representando o comprimento original da mensagem (antes do
            padding), em binário.
          </li>
          <li>
            <strong>Dividir em blocos de 512 bits:</strong> agora a mensagem é
            múltiplo de 512. Divida-a em blocos de 512 bits para processamento.
          </li>
          <li>
            <strong>Inicializar variáveis de hash:</strong> configure oito
            registradores (a, b, c, d, e, f, g, h) com constantes iniciais
            definidas pelo padrão SHA-2.
          </li>
          <li>
            <strong>Expandir bloco em 64 palavras:</strong> para cada bloco,
            crie uma sequência de 64 palavras de 32 bits, sendo as 16 primeiras
            diretamente do bloco, e as outras 48 geradas com funções de rotação
            e XOR.
          </li>
          <li>
            <strong>Processar 64 rodadas:</strong> em cada rodada:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                Use funções <code>σ0</code>, <code>σ1</code>, <code>Σ0</code>,{" "}
                <code>Σ1</code>, <code>Ch</code> e <code>Maj</code>.
              </li>
              <li>
                Use constantes <code>K[t]</code> definidas pelo padrão.
              </li>
              <li>
                Atualize os registradores temporários com base nessas operações.
              </li>
            </ul>
          </li>
          <li>
            <strong>Atualizar o hash:</strong> após processar o bloco, adicione
            os valores resultantes aos valores anteriores dos registradores a–h.
          </li>
          <li>
            <strong>Concatenar a saída:</strong> após processar todos os blocos,
            concatene os registradores finais em hexadecimal para formar o hash
            SHA-256 final.
          </li>
        </ol>
        <p className="mt-4">
          A implementação pode ser feita manualmente em linguagens como C,
          Python ou JavaScript, ou usando bibliotecas como <code>crypto</code>{" "}
          no Node.js ou <code>hashlib</code> no Python.
        </p>
      </>
    ),
  },
];
