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
  1: "bg-red-500",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-green-500",
  5: "bg-blue-500",
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
    <div className="w-full max-w-6xl mx-auto mb-10 px-8 py-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-2">
        🔍 Detalhes do Algoritmo
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-300">
        {/* CARD */}
        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            🔠 Algoritmo
          </p>
          <p className="text-white mt-1">{algorithmName}</p>
        </div>

        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            🔐 Tipo
          </p>
          <p className="text-white mt-1">{algorithmType}</p>
        </div>

        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            🧬 Estrutura Interna
          </p>
          <p className="text-white mt-1">{structure}</p>
        </div>

        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            🧠 Reversível
          </p>
          <p className="text-white mt-1">{isReversible ? "Sim" : "Não"}</p>
        </div>

        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            ⚙️ Dificuldade
          </p>
          <p className="text-white mt-1">{implementationDifficulty}</p>
        </div>

        <div className="bg-neutral-800/60 p-4 rounded-xl">
          <p className="text-gray-400 font-semibold flex items-center gap-2">
            🌐 Usos Comuns
          </p>
          <p className="text-white mt-1">{commonUses}</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400 font-semibold mb-3 flex items-center justify-center gap-2 text-base">
          🔒 Nível de Segurança
        </p>
        <div className="flex justify-center gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-8 h-4 rounded-sm hover:opacity-75 transition-all duration-300 ${
                i <= securityLevel
                  ? levelColors[securityLevel]
                  : "bg-neutral-700"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 italic">
          {securityLevel === 5 && "Muito seguro para aplicações modernas."}
          {securityLevel === 4 && "Seguro, amplamente confiável."}
          {securityLevel === 3 && "Razoável, use com cuidado."}
          {securityLevel === 2 && "Pouco seguro, evite em contextos críticos."}
          {securityLevel === 1 && "Inseguro, não recomendado."}
        </p>
      </div>
    </div>
  );
};
