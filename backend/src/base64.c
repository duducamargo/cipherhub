#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Tabela Base64 contendo os 64 caracteres válidos para codificação
const char BASE64_TABLE[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Função que converte texto em sua representação binária (ainda presente para manter a estrutura original, mas não utilizada)
void text_to_binary(const char *text, char *binary)
{
    binary[0] = '\0';
    for (int i = 0; text[i] != '\0'; i++)
    {
        char buffer[9];
        snprintf(buffer, sizeof(buffer), "%08b", (unsigned char)text[i]);
        strcat(binary, buffer);
    }
}

// Função que converte uma string binária para Base64 (mantida por legado, mas não utilizada)
void binary_to_base64(const char *binary, char *base64)
{
    int len = strlen(binary);
    int buffer = 0;
    int bits_collected = 0;
    int base64_index = 0;

    for (int i = 0; i < len; i++)
    {
        buffer = (buffer << 1) | (binary[i] - '0');
        bits_collected++;

        if (bits_collected == 6)
        {
            int index = buffer & 0b111111;
            base64[base64_index++] = BASE64_TABLE[index];
            bits_collected = 0;
            buffer = 0;
        }
    }

    if (bits_collected > 0)
    {
        buffer <<= (6 - bits_collected);
        int index = buffer & 0b111111;
        base64[base64_index++] = BASE64_TABLE[index];
    }

    while (base64_index % 4 != 0)
    {
        base64[base64_index++] = '=';
    }

    base64[base64_index] = '\0';
}

// Função que converte uma string Base64 para binário (mantida por legado, mas não utilizada)
void base64_to_binary(const char *base64, char *binary)
{
    binary[0] = '\0';
    for (int i = 0; base64[i] != '\0'; i++)
    {
        if (base64[i] == '=')
        {
            break;
        }
        char *ptr = strchr(BASE64_TABLE, base64[i]);
        if (ptr == NULL)
        {
            printf("Caractere inválido em Base64: %c\n", base64[i]);
            exit(1);
        }
        int index = ptr - BASE64_TABLE;
        char buffer[7];
        snprintf(buffer, sizeof(buffer), "%06b", index);
        strcat(binary, buffer);
    }
}

// Função que converte uma string binária para texto (mantida por legado, mas não utilizada)
void binary_to_text(const char *binary, char *text)
{
    int len = strlen(binary);
    int text_index = 0;

    for (int i = 0; i < len; i += 8)
    {
        char byte_str[9];
        strncpy(byte_str, &binary[i], 8);
        byte_str[8] = '\0';
        unsigned char byte = (unsigned char)strtol(byte_str, NULL, 2);
        text[text_index++] = byte;
    }
    text[text_index] = '\0';
}

// NOVA Função de codificação Base64 direta (corrigida)
void encode_base64(const unsigned char *input, char *output)
{
    int i = 0, j = 0;
    int len = strlen((const char *)input);

    while (i < len)
    {
        unsigned char a = i < len ? input[i++] : 0;
        unsigned char b = i < len ? input[i++] : 0;
        unsigned char c = i < len ? input[i++] : 0;

        unsigned int triple = (a << 16) + (b << 8) + c;

        output[j++] = BASE64_TABLE[(triple >> 18) & 0x3F];
        output[j++] = BASE64_TABLE[(triple >> 12) & 0x3F];
        output[j++] = (i > len + 1) ? '=' : BASE64_TABLE[(triple >> 6) & 0x3F];
        output[j++] = (i > len) ? '=' : BASE64_TABLE[triple & 0x3F];
    }

    output[j] = '\0';
}

// NOVA Função de decodificação Base64 direta (corrigida)
void decode_base64(const char *input, char *output)
{
    int len = strlen(input);
    int i = 0, j = 0;
    unsigned char dtable[256];
    memset(dtable, 0x80, 256); // valor padrão inválido

    for (int k = 0; k < 64; k++)
        dtable[(unsigned char)BASE64_TABLE[k]] = k;
    dtable['='] = 0;

    while (i < len)
    {
        unsigned int buffer = 0;
        int pad = 0;

        for (int k = 0; k < 4; k++)
        {
            if (i >= len)
                break;
            char c = input[i++];
            if (c == '=')
                pad++;
            buffer = (buffer << 6) | dtable[(unsigned char)c];
        }

        if (pad < 3)
            output[j++] = (buffer >> 16) & 0xFF;
        if (pad < 2)
            output[j++] = (buffer >> 8) & 0xFF;
        if (pad < 1)
            output[j++] = buffer & 0xFF;
    }

    output[j] = '\0';
}

// Função principal do programa
int main(int argc, char *argv[])
{
    char binary[8192];
    char output[8192];

    if (argc < 3)
    {
        fprintf(stderr, "Uso: %s <modo> <entrada>\nModo: 1=encode, 2=decode\n", argv[0]);
        return 1;
    }

    int option = atoi(argv[1]);

    // Junta todos os argumentos após o modo
    char input[8192] = "";
    for (int i = 2; i < argc; i++)
    {
        strcat(input, argv[i]);
        if (i < argc - 1)
            strcat(input, " ");
    }

    if (option == 1)
    {
        encode_base64((unsigned char *)input, output);
        printf("%s\n", output);
    }
    else if (option == 2)
    {
        decode_base64(input, output);
        printf("%s\n", output);
    }
    else
    {
        fprintf(stderr, "Modo inválido: use 1 para codificar ou 2 para decodificar.\n");
        return 1;
    }

    return 0;
}
