#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

// Constantes SHA-256 (primeiros 32 bits das raízes cúbicas dos 64 primeiros primos)
static const uint32_t K[64] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2};

uint32_t Ch(uint32_t x, uint32_t y, uint32_t z)
{
    return (x & y) ^ (~x & z);
}

uint32_t Maj(uint32_t x, uint32_t y, uint32_t z)
{
    return (x & y) ^ (x & z) ^ (y & z);
}

uint32_t Sigma0(uint32_t x)
{
    return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
}

uint32_t Sigma1(uint32_t x)
{
    return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
}

// Rotação para a direita
uint32_t rotr(uint32_t x, uint32_t n)
{
    return (x >> n) | (x << (32 - n));
}

// σ0 e σ1
uint32_t sigma0(uint32_t x)
{
    return rotr(x, 7) ^ rotr(x, 18) ^ (x >> 3);
}

uint32_t sigma1(uint32_t x)
{
    return rotr(x, 17) ^ rotr(x, 19) ^ (x >> 10);
}

void initialize_hash_values(uint32_t *H)
{
    H[0] = 0x6a09e667;
    H[1] = 0xbb67ae85;
    H[2] = 0x3c6ef372;
    H[3] = 0xa54ff53a;
    H[4] = 0x510e527f;
    H[5] = 0x9b05688c;
    H[6] = 0x1f83d9ab;
    H[7] = 0x5be0cd19;
}

uint8_t *sha256_pad_message(const uint8_t *message, size_t message_len, size_t *new_len_out)
{
    size_t bit_len = message_len * 8;

    size_t total_len = message_len + 1 + 8;
    size_t padding_len = 0;

    while ((total_len + padding_len) % 64 != 0)
    {
        padding_len++;
    }

    total_len += padding_len;

    uint8_t *padded_message = (uint8_t *)calloc(total_len, sizeof(uint8_t));
    if (!padded_message)
    {
        return NULL;
    }

    memcpy(padded_message, message, message_len);

    padded_message[message_len] = 0x80;

    // Adicionar tamanho original em bits (big-endian) nos últimos 8 bytes
    for (int i = 0; i < 8; i++)
    {
        padded_message[total_len - 1 - i] = (bit_len >> (i * 8)) & 0xFF;
    }

    *new_len_out = total_len;
    return padded_message;
}

void print_binary(const uint8_t *data, size_t len)
{
    for (size_t i = 0; i < len; i++)
    {
        for (int bit = 7; bit >= 0; bit--)
        {
            printf("%d", (data[i] >> bit) & 1);
        }
        printf(" ");
        if ((i + 1) % 8 == 0)
            printf("\n"); // Quebra linha a cada 8 bytes
    }
}

void message_schedule(const uint8_t *block, uint32_t W[64])
{
    // Primeiros 16 valores vêm diretamente do bloco (big-endian)
    for (int i = 0; i < 16; i++)
    {
        W[i] = (block[i * 4] << 24) |
               (block[i * 4 + 1] << 16) |
               (block[i * 4 + 2] << 8) |
               (block[i * 4 + 3]);
    }

    // Expandindo para W[16..63]
    for (int i = 16; i < 64; i++)
    {
        W[i] = sigma1(W[i - 2]) + W[i - 7] + sigma0(W[i - 15]) + W[i - 16];
    }
}

void sha256_compress(uint32_t *H, const uint32_t W[64])
{
    // Inicializa variáveis temporárias com os registradores H0.....H7
    uint32_t a = H[0];
    uint32_t b = H[1];
    uint32_t c = H[2];
    uint32_t d = H[3];
    uint32_t e = H[4];
    uint32_t f = H[5];
    uint32_t g = H[6];
    uint32_t h = H[7];

    for (int i = 0; i < 64; i++)
    {
        uint32_t T1 = h + Sigma1(e) + Ch(e, f, g) + K[i] + W[i];
        uint32_t T2 = Sigma0(a) + Maj(a, b, c);

        h = g;
        g = f;
        f = e;
        e = d + T1;
        d = c;
        c = b;
        b = a;
        a = T1 + T2;
    }

    // Atualiza os valores dos registradores
    H[0] += a;
    H[1] += b;
    H[2] += c;
    H[3] += d;
    H[4] += e;
    H[5] += f;
    H[6] += g;
    H[7] += h;
}

void print_final_hash(uint32_t H[8])
{
    for (int i = 0; i < 8; i++)
    {
        printf("%08x", H[i]);
    }
    printf("\n");
}

void get_hash_bytes(uint32_t H[8], uint8_t hash_out[32])
{
    for (int i = 0; i < 8; i++)
    {
        hash_out[i * 4 + 0] = (H[i] >> 24) & 0xff;
        hash_out[i * 4 + 1] = (H[i] >> 16) & 0xff;
        hash_out[i * 4 + 2] = (H[i] >> 8) & 0xff;
        hash_out[i * 4 + 3] = H[i] & 0xff;
    }
}

int main()
{
    uint32_t H[8];
    initialize_hash_values(H);

    char input[256];
    size_t padded_len;

    printf("Digite a mensagem: ");
    fgets(input, sizeof(input), stdin);

    uint8_t *padded = sha256_pad_message((const uint8_t *)input, strlen(input), &padded_len);

    if (padded == NULL)
    {
        fprintf(stderr, "Erro ao alocar memoria\n");
        return 1;
    }

    printf("Mensagem com padding (em binario):\n");
    print_binary(padded, padded_len);

    free(padded);
    return 0;
}