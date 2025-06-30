"use client";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bream";
import { motion } from "framer-motion";

export function TabSymetricEncryption() {
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
    title: "O que é Criptografia Simétrica?",
    badge: "Definição",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1950&q=80",
    description: (
      <>
        <p>
          A criptografia simétrica é um método de codificação em que a mesma
          chave é usada tanto para criptografar quanto para descriptografar uma
          informação. Isso exige que todas as partes envolvidas compartilhem
          essa chave de maneira segura.
        </p>
        <p>
          Imagine que você guarda um segredo em uma caixa trancada com cadeado.
          Para abrir, a outra pessoa precisa da mesma chave. Se alguém
          interceptar essa chave, todo o conteúdo pode ser comprometido. Por
          isso, o maior desafio da criptografia simétrica é o gerenciamento
          seguro da chave.
        </p>
        <p>
          Apesar disso, ela é extremamente eficiente em desempenho, sendo
          bastante utilizada em contextos onde as partes já se conhecem ou
          conseguem trocar a chave com segurança.
        </p>
      </>
    ),
  },
  {
    title: "Vantagens e Desvantagens",
    badge: "Comparativo",
    image:
      "https://www.universidadejava.com.br/images/2020-05-22-criptografia-simetrica-01.png",
    description: (
      <>
        <p>
          Como qualquer tecnologia, a criptografia simétrica apresenta pontos
          positivos e limitações que devem ser considerados dependendo do
          cenário.
        </p>
        <p>
          <strong>Vantagens:</strong>
        </p>
        <ul>
          <li>
            • Algoritmos mais simples e mais rápidos do que os assimétricos.
          </li>
          <li>
            • Ideal para criptografar grandes volumes de dados com eficiência.
          </li>
          <li>
            • Menor demanda computacional, o que a torna excelente para
            dispositivos com recursos limitados.
          </li>
        </ul>
        <p>
          <strong>Desvantagens:</strong>
        </p>
        <ul>
          <li>
            • Risco na troca da chave: se for interceptada, toda a comunicação
            está comprometida.
          </li>
          <li>
            • Escalabilidade limitada: quanto mais usuários, mais chaves
            precisam ser gerenciadas de forma segura.
          </li>
        </ul>
        <p>
          Em resumo, é rápida e eficaz, mas exige muito cuidado na troca e
          proteção da chave.
        </p>
      </>
    ),
  },
  {
    title: "Exemplos de Algoritmos Simétricos",
    badge: "Algoritmos populares",
    image:
      "https://www.alura.com.br/artigos/assets/criptografia-diferencas-simetrica-assimetrica-homomorfica/imagem1.jpg",
    description: (
      <>
        <p>
          Diversos algoritmos foram desenvolvidos ao longo do tempo para atender
          às diferentes necessidades de criptografia simétrica. Os mais
          utilizados são:
        </p>
        <ul>
          <li>
            <strong>AES (Advanced Encryption Standard):</strong> Padrão atual e
            altamente seguro, usado por governos, bancos e sistemas
            corporativos. Trabalha com blocos de 128 bits e chaves de 128, 192
            ou 256 bits.
          </li>
          <li>
            <strong>DES (Data Encryption Standard):</strong> Um dos primeiros
            algoritmos amplamente usados. Hoje é considerado obsoleto por ser
            vulnerável a ataques de força bruta.
          </li>
          <li>
            <strong>Triple DES (3DES):</strong> Uma versão mais segura do DES,
            onde a criptografia é feita três vezes com diferentes chaves.
          </li>
          <li>
            <strong>Blowfish e Twofish:</strong> Alternativas seguras e rápidas,
            frequentemente usadas em aplicações onde o desempenho é crítico.
          </li>
        </ul>
        <p>
          Cada algoritmo possui características próprias, e a escolha entre eles
          depende de fatores como segurança, velocidade e contexto de uso.
        </p>
      </>
    ),
  },
  {
    title: "Onde a Criptografia Simétrica é usada?",
    badge: "Aplicações",
    image:
      "https://dhg1h5j42swfq.cloudfront.net/2022/11/07210712/criptografiasimetrica.png",
    description: (
      <>
        <p>
          A criptografia simétrica é amplamente empregada em diversas situações
          cotidianas e sistemas críticos. Alguns exemplos de aplicação incluem:
        </p>
        <ul>
          <li>
            • Proteção de arquivos e pastas locais, com programas como WinRAR e
            7-Zip.
          </li>
          <li>
            • VPNs (Redes Privadas Virtuais), para criptografar o tráfego de
            rede entre dois pontos.
          </li>
          <li>
            • Criptografia de discos rígidos inteiros, como com BitLocker ou
            VeraCrypt.
          </li>
          <li>
            • Comunicação segura entre servidores dentro de redes corporativas.
          </li>
        </ul>
        <p>
          Ela também é usada em conjunto com a criptografia assimétrica em
          sistemas híbridos, onde a chave simétrica é trocada de forma segura
          usando criptografia assimétrica, garantindo desempenho e segurança ao
          mesmo tempo.
        </p>
        <p>Sua aplicação continua sendo vital para o mundo digital moderno.</p>
      </>
    ),
  },
];
