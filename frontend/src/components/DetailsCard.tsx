import React from "react";

interface DetailsCardProps {
  algorithmName: string;
  algorithmType: string;
  structure: string;
  isReversible: boolean;
  implementationDifficulty: string;
  commonUses: string;
  securityLevel: 1 | 2 | 3 | 4 | 5;
}

const levelColors = {
  1: "bg-red-600 shadow-red-500/40",
  2: "bg-orange-500 shadow-orange-400/40",
  3: "bg-yellow-400 shadow-yellow-300/40",
  4: "bg-green-500 shadow-green-400/40",
  5: "bg-blue-500 shadow-blue-400/40",
};

export const DetailsCard: React.FC<DetailsCardProps> = ({
  algorithmName,
  algorithmType,
  structure,
  isReversible,
  implementationDifficulty,
  commonUses,
  securityLevel,
}) => {
  return (
    <div className="neon-runner-border w-full max-w-6xl mx-auto mb-12 px-8 py-10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-zinc-900 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.7)]">
      <h2 className="text-3xl font-bold text-white mb-10 tracking-tight flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
        🚀 Detalhes do Algoritmo
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-300">
        {[
          { label: "🔠 Algoritmo", value: algorithmName },
          { label: "🔐 Tipo", value: algorithmType },
          { label: "🧬 Estrutura", value: structure },
          { label: "🧠 Reversível", value: isReversible ? "Sim" : "Não" },
          { label: "⚙️ Implementação", value: implementationDifficulty },
          { label: "🌐 Usos Comum", value: commonUses },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-neutral-800/70 hover:bg-neutral-800/90 transition-all duration-300 p-5 rounded-xl border border-neutral-700 shadow-md backdrop-blur-md"
          >
            <p className="text-gray-400 font-semibold mb-1">{item.label}</p>
            <p className="text-white text-base font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-300 font-semibold mb-4 flex justify-center items-center text-base">
          🛡️ Nível de Segurança
        </p>
        <div className="flex justify-center gap-3 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-8 h-4 rounded-full hover:opacity-70 transition-all duration-300 ${
                i <= securityLevel
                  ? `${levelColors[securityLevel]} shadow-md`
                  : "bg-neutral-700"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 italic">
          {securityLevel === 5 && "Muito seguro para aplicações modernas."}
          {securityLevel === 4 && "Seguro e amplamente confiável."}
          {securityLevel === 3 && "Moderadamente seguro — use com cautela."}
          {securityLevel === 2 && "Fraco — evite em contextos sensíveis."}
          {securityLevel === 1 && "Inseguro — não recomendado."}
        </p>
      </div>
    </div>
  );
};
