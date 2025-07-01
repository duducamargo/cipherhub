import type { Testimonial } from "./testimonials-types";

export const base64Testimonials: Testimonial[] = [
  {
    quote:
      "Usamos codificação Base64 para transmitir dados binários, como imagens e anexos, através de APIs REST que exigem compatibilidade com formato de texto. Essa abordagem garante integridade na transferência sem depender de arquivos temporários ou headers complexos.",
    name: "Google",
    title: "Transmissão de imagens via APIs REST",
  },
  {
    quote:
      "A Base64 é fundamental em nosso sistema de autenticação. Tokens de acesso são gerados e incluídos nos headers de requisição em formato Base64, assegurando compatibilidade com protocolos HTTP e facilitando a leitura e validação segura dos dados no backend.",
    name: "Auth0",
    title: "Codificação de tokens de autenticação",
  },
  {
    quote:
      "Durante o envio de e-mails com anexos em nosso serviço, utilizamos codificação Base64 para transformar arquivos binários em texto ASCII. Isso evita a corrupção dos dados e garante compatibilidade com todos os clientes de e-mail.",
    name: "SendGrid",
    title: "Envio de anexos em e-mails",
  },
  {
    quote:
      "Implementamos Base64 em nosso sistema de QR Codes para embutir dados binários criptografados como strings legíveis, facilitando o transporte seguro de credenciais em ambientes de baixa largura de banda e sem conexões constantes.",
    name: "IBM",
    title: "Codificação de dados em QR Codes para credenciais seguras",
  },
  {
    quote:
      "Em sistemas legados, usamos Base64 para serializar e persistir imagens em campos de texto de bancos de dados SQL. Apesar de não ser ideal para grandes arquivos, a técnica mantém compatibilidade com antigos sistemas que não aceitam blobs binários.",
    name: "Oracle",
    title: "Serialização de imagens em bases de dados legadas",
  },
];
