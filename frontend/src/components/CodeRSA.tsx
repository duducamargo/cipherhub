import { CodeBlock } from "./ui/code-block";

export default function CodeRSA() {
  return (
    <>
      <CodeBlock
        language="c"
        filename="rsa.c"
        maxHeigthMd="100rem"
        maxHeigth="100rem"
        code={`#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

// Tipos para inteiros de 128 bits
typedef __uint128_t uint128_t;
typedef __int128_t int128_t;

// Função para imprimir um número uint128_t na tela
void print_uint128(uint128_t n) {
    if (n == 0) {
        printf("0");
        return;
    }
    char buffer[64] = {0};
    int i = 62;
    while (n > 0 && i >= 0) {
        buffer[i--] = '0' + (n % 10);
        n /= 10;
    }
    printf("%s", &buffer[i + 1]);
}

// Calcula o máximo divisor comum (MDC) entre dois inteiros
uint128_t gcd(uint128_t a, uint128_t b) {
    while (b != 0) {
        uint128_t temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Calcula o inverso modular de e módulo phi usando o algoritmo de Euclides Estendido
uint128_t modinv(uint128_t e, uint128_t phi) {
    int128_t t = 0, newt = 1;
    int128_t r = phi, newr = e;

    while (newr != 0) {
        int128_t q = r / newr;
        int128_t temp = newt;
        newt = t - q * newt;
        t = temp;

        temp = newr;
        newr = r - q * newr;
        r = temp;
    }

    if (r > 1) return 0;         // Não há inverso se MDC ≠ 1
    if (t < 0) t += phi;         // Ajuste se t for negativo
    return (uint128_t)t;
}

// Função para exponenciação modular eficiente (base^exp mod mod)
uint128_t mod_exp(uint128_t base, uint128_t exp, uint128_t mod) {
    uint128_t result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % mod;
        exp >>= 1;
        base = (base * base) % mod;
    }
    return result;
}

int main(int argc, char *argv[]) {
    // Verifica se foi passada uma mensagem como argumento
    if (argc != 2) {
        fprintf(stderr, "Uso: %s <mensagem>\\n", argv[0]);
        return 1;
    }

    // Copia a mensagem de entrada para uma variável local com segurança
    const char *input_msg = argv[1];
    char mensagem[256];
    size_t input_len = strlen(input_msg);
    if (input_len >= sizeof(mensagem) - 1)
        input_len = sizeof(mensagem) - 1;

    memcpy(mensagem, input_msg, input_len);
    mensagem[input_len] = '\\0';

    // Geração de chaves RSA usando dois primos pequenos
    uint128_t p = 10000019;
    uint128_t q = 10000079;
    uint128_t n = p * q;                        // Modulo público
    uint128_t phi = (p - 1) * (q - 1);          // Totiente de Euler
    uint128_t e = 65537;                        // Expoente público padrão
    uint128_t d = modinv(e, phi);               // Cálculo do expoente privado

    // Verifica se chaves são válidas
    if (d == 0 || gcd(e, phi) != 1) {
        fprintf(stderr, "Erro ao gerar chaves RSA\\n");
        return 1;
    }

    int blocos = (int)strlen(mensagem);         // Número de blocos (1 caractere = 1 bloco)
    uint128_t criptografada[256];              // Vetor para armazenar os blocos criptografados
    unsigned char decodificada[256];           // Vetor para armazenar a mensagem decodificada
    int pos = 0;

    // Início da saída formatada
    printf("{\n  \\"encrypt\\": [");

    // Criptografia caractere a caractere
    for (int i = 0; i < blocos; i++) {
        uint128_t bloco = (unsigned char)mensagem[i];
        criptografada[i] = mod_exp(bloco, e, n);  // C^e mod n
        print_uint128(criptografada[i]);
        if (i < blocos - 1)
            printf(", ");
    }

    // Início da parte de descriptografia
    printf("],\\n  \\"decrypt\\": \\"");

    for (int i = 0; i < blocos; i++) {
        uint128_t bloco = mod_exp(criptografada[i], d, n);  // C^d mod n
        decodificada[pos++] = (unsigned char)bloco;
    }

    // Finaliza string e imprime
    decodificada[pos] = '\\0';
    printf("%s\\"\\n}\\n", (char *)decodificada);
    return 0;
}

`}
      />
    </>
  );
}
