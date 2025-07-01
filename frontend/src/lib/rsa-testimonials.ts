import type { Testimonial } from "./testimonials-types";

export const rsaTestimonials: Testimonial[] = [
  {
    quote:
      "RSA é um pilar da nossa infraestrutura de segurança. Utilizamos criptografia RSA para troca segura de chaves simétricas durante a negociação TLS, garantindo que nossos usuários iniciem conexões HTTPS com privacidade e autenticidade.",
    name: "Cloudflare",
    title: "Negociação de chaves em conexões HTTPS (TLS)",
  },
  {
    quote:
      "No processo de assinatura digital, aplicamos o RSA para garantir que mensagens e documentos eletrônicos transmitidos entre instituições financeiras sejam autênticos e inalterados, assegurando a integridade de cada transação.",
    name: "Banco do Brasil",
    title: "Assinaturas digitais em transações financeiras",
  },
  {
    quote:
      "RSA é utilizado em nossos dispositivos de autenticação multifactor para validar a identidade dos usuários. As chaves públicas são armazenadas nos servidores e usadas para verificar tokens assinados localmente nos dispositivos.",
    name: "Yubico",
    title: "Verificação de identidade em autenticação de dois fatores",
  },
  {
    quote:
      "Durante a transmissão de arquivos confidenciais entre sistemas internos e parceiros externos, usamos RSA para criptografar as chaves de sessão AES. Isso garante que somente o destinatário autorizado possa acessar o conteúdo.",
    name: "Siemens",
    title: "Criptografia de chaves de sessão para transferência de arquivos",
  },
  {
    quote:
      "Integramos RSA em nossa cadeia de certificados para proteger a comunicação entre sistemas industriais e a nuvem. A infraestrutura de chave pública garante que dispositivos autenticados troquem dados com total confiança.",
    name: "Schneider Electric",
    title: "Autenticação de dispositivos via PKI em IoT industrial",
  },
];
