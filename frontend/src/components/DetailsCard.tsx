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
  structure, // NOVO CAMPO
  isReversible,
  implementationDifficulty,
  commonUses,
  securityLevel,
}) => {
  return (
    <div className="w-full max-w-5xl mb-10 px-6 py-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
        🔍 Detalhes do Algoritmo
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-300">
        <div>
          <p className="text-gray-400 font-medium">🔠 Algoritmo</p>
          <p className="text-white">{algorithmName}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">🔐 Tipo</p>
          <p className="text-white">{algorithmType}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">🧬 Estrutura Interna</p>
          <p className="text-white">{structure}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">🧠 Reversível</p>
          <p className="text-white">{isReversible ? "Sim" : "Não"}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">
            ⚙️ Dificuldade de Implementação
          </p>
          <p className="text-white">{implementationDifficulty}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">🌐 Usos Comuns</p>
          <p className="text-white">{commonUses}</p>
        </div>
      </div>

      <hr className="my-6 border-neutral-800" />

      <div className="w-fit mx-auto text-center">
        <p className="text-gray-400 font-medium mb-2">🔒 Nível de Segurança</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-8 h-4 rounded hover:opacity-70 transition-all ${
                i <= securityLevel
                  ? levelColors[securityLevel]
                  : "bg-neutral-700"
              }`}
            />
          ))}
        </div>
        <p className="text-xs mt-2 text-gray-400">
          {securityLevel === 5 && "Muito seguro para aplicações modernas."}
          {securityLevel === 4 && "Seguro, amplamente confiável."}
          {securityLevel === 3 &&
            "Razoável, pode ser suficiente em alguns contextos."}
          {securityLevel === 2 && "Pouco seguro, evite em aplicações críticas."}
          {securityLevel === 1 && "Inseguro, não recomendado."}
        </p>
      </div>
    </div>
  );
};
