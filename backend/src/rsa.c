#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

typedef uint64_t ull;

// Função para calcular o MDC (máximo divisor comum)
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

// Algoritmo de Euclides estendido para obter inverso modular
ull modinv(ull e, ull phi)
{
    int64_t t = 0, newt = 1;
    int64_t r = (int64_t)phi, newr = (int64_t)e;

    while (newr != 0)
    {
        int64_t q = r / newr;

        int64_t temp = t;
        t = newt;
        newt = temp - q * newt;

        temp = r;
        r = newr;
        newr = temp - q * newr;
    }

    if (r > 1)
        return 0; // sem inverso

    if (t < 0)
        t += phi;

    return (ull)t;
}

// Exponenciação modular eficiente
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

    const char *input_msg = argv[1];
    char mensagem[256];
    size_t input_len = strlen(input_msg);

    if (input_len >= sizeof(mensagem) - 1)
        input_len = sizeof(mensagem) - 1;

    memcpy(mensagem, input_msg, input_len);
    mensagem[input_len] = '\0';

    // RSA com primos pequenos (apenas 1 caractere por bloco)
    ull p = 61;
    ull q = 59;
    ull n = p * q; // 3599
    ull phi = (p - 1) * (q - 1);
    ull e = 17;
    ull d = modinv(e, phi);

    printf("e = %llu, phi = %llu, d = %llu\n", e, phi, d);

    if (d == 0 || gcd(e, phi) != 1)
    {
        fprintf(stderr, "Erro ao gerar chaves RSA\n");
        return 1;
    }

    int blocos = (int)strlen(mensagem);
    ull criptografada[256];
    unsigned char decodificada[256];
    int pos = 0;

    printf("{\n  \"encrypt\": [");

    for (int i = 0; i < blocos; i++)
    {
        ull bloco = (unsigned char)mensagem[i];

        criptografada[i] = mod_exp(bloco, e, n);
        printf("%llu", criptografada[i]);
        if (i < blocos - 1)
            printf(", ");
    }

    printf("],\n  \"decrypt\": \"");

    for (int i = 0; i < blocos; i++)
    {
        ull bloco = mod_exp(criptografada[i], d, n);
        decodificada[pos++] = (unsigned char)bloco;
    }

    decodificada[pos] = '\0';
    printf("%s\"\n}\n", (char *)decodificada);

    return 0;
}
