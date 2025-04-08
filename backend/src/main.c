#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>


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