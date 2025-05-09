#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

typedef uint64_t ull;

// Função para calcular o MDC
ull gcd(ull a, ull b)
{
    while (b != 0)
    {
        ull temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Algoritmo de Euclides Estendido
ull modinv(ull e, ull phi)
{
    int64_t t = 0, newt = 1;
    int64_t r = phi, newr = e;

    while (newr != 0)
    {
        int64_t q = r / newr;
        int64_t temp = newt;
        newt = t - q * newt;
        t = temp;

        temp = newr;
        newr = r - q * newr;
        r = temp;
    }

    if (r > 1)
        return 0;
    if (t < 0)
        t += phi;
    return (ull)t;
}

// Exponenciação modular
ull mod_exp(ull base, ull exp, ull mod)
{
    ull result = 1;
    base = base % mod;

    while (exp > 0)
    {
        if (exp % 2 == 1)
            result = (result * base) % mod;

        exp = exp >> 1;
        base = (base * base) % mod;
    }
    return result;
}

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "Uso: %s <mensagem>\n", argv[0]);
        return 1;
    }

    // === Etapa 1: Gerar chaves ===
    ull p = 1000003;
    ull q = 1000037;
    ull n = p * q;
    ull phi = (p - 1) * (q - 1);
    ull e = 17;

    if (gcd(e, phi) != 1)
    {
        printf("Erro: 'e' não é coprimo de φ(n)\n");
        return 1;
    }

    ull d = modinv(e, phi);
    if (d == 0)
    {
        printf("Erro ao calcular inverso modular\n");
        return 1;
    }

    printf("Chave pública: (e=%llu, n=%llu)\n", e, n);
    printf("Chave privada: (d=%llu, n=%llu)\n", d, n);

    // === Entrada da mensagem ===
    char mensagem[256];
    printf("\nDigite a mensagem a ser criptografada: ");
    fgets(mensagem, sizeof(mensagem), stdin);
    mensagem[strcspn(mensagem, "\n")] = 0;

    int len = strlen(mensagem);
    if (len % 2 != 0)
    {
        mensagem[len++] = ' '; // padding
        mensagem[len] = '\0';
    }

    int blocos = len / 2;
    ull criptografada[128];

    // === Criptografia ===
    printf("\n--- Criptografando (2 caracteres por bloco) ---\n");
    for (int i = 0; i < blocos; i++)
    {
        // 2 caracteres = 16 bits (8 + 8)
        ull bloco = ((unsigned char)mensagem[2 * i] << 8) | (unsigned char)mensagem[2 * i + 1];
        criptografada[i] = mod_exp(bloco, e, n);
        printf("'%c%c' -> %llu\n", mensagem[2 * i], mensagem[2 * i + 1], criptografada[i]);
    }

    // === Descriptografia ===
    char decodificada[256];
    int pos = 0;

    printf("\n--- Descriptografando ---\n");
    for (int i = 0; i < blocos; i++)
    {
        ull bloco = mod_exp(criptografada[i], d, n);

        unsigned char high = (bloco >> 8) & 0xFF;
        unsigned char low = bloco & 0xFF;

        decodificada[pos++] = (char)high;
        decodificada[pos++] = (char)low;
    }
    decodificada[pos] = '\0';

    printf("Mensagem decodificada: %s\n", decodificada);

    return 0;
}
