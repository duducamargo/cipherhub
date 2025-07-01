import type { Testimonial } from "./testimonials-types";

export const sha256Testimonials: Testimonial[] = [
  {
    quote:
      "O algoritmo SHA-256 é usado em todos os blocos minerados em nossa blockchain. Ele garante a integridade dos dados e a imutabilidade do histórico de transações, formando a base da confiança na rede.",
    name: "Bitcoin",
    title: "Geração de hashes em blocos de blockchain",
  },
  {
    quote:
      "Empregamos SHA-256 para armazenar senhas de forma segura em nossa plataforma. Mesmo em caso de violação, os dados permanecem protegidos, já que os hashes não podem ser revertidos para o texto original.",
    name: "GitHub",
    title: "Hashing seguro de senhas de usuário",
  },
  {
    quote:
      "SHA-256 é utilizado em nossos pipelines de CI/CD para verificar a integridade dos pacotes baixados e assegurar que os artefatos de build não foram corrompidos ou alterados durante o transporte.",
    name: "GitLab",
    title: "Verificação de integridade de artefatos em CI/CD",
  },
  {
    quote:
      "Nosso sistema de assinatura digital usa SHA-256 para gerar resumos criptográficos dos documentos, garantindo que qualquer modificação seja detectada antes da verificação da assinatura.",
    name: "Adobe",
    title: "Resumo de documentos para assinatura digital",
  },
  {
    quote:
      "Para evitar colisões e falsificações, utilizamos SHA-256 no versionamento de arquivos distribuídos entre servidores e datacenters. Isso nos permite verificar rapidamente se o conteúdo foi alterado ou comprometido.",
    name: "Amazon Web Services",
    title: "Controle de integridade em sistemas distribuídos",
  },
];
