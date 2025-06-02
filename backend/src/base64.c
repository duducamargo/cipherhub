#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Tabela Base64 contendo os 64 caracteres válidos para codificação
const char BASE64_TABLE[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Função que converte texto em sua representação binária
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

// Função que converte uma string binária para Base64
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

    // Adiciona padding '=' para garantir que o comprimento seja múltiplo de 4
    while (base64_index % 4 != 0)
    {
        base64[base64_index++] = '=';
    }

    base64[base64_index] = '\0';
}

// Função que converte uma string Base64 para binário
void base64_to_binary(const char *base64, char *binary)
{
    binary[0] = '\0';
    for (int i = 0; base64[i] != '\0'; i++)
    {
        if (base64[i] == '=')
        { // Ignora o padding '='
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

// Função que converte uma string binária para texto
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

// Função principal do programa
int main(int argc, char *argv[])
{
    char binary[8192];
    char output[8192];

    if (argc != 3)
    {
        fprintf(stderr, "Uso: %s <modo> <entrada>\nModo: 1=encode, 2=decode\n", argv[0]);
        return 1;
    }

    int option = atoi(argv[1]);
    const char *input = argv[2];

    if (option == 1)
    {
        text_to_binary(input, binary);
        binary_to_base64(binary, output);
        printf("%s\n", output);
    }
    else if (option == 2)
    {
        base64_to_binary(input, binary);
        binary_to_text(binary, output);
        printf("%s\n", output);
    }
    else
    {
        fprintf(stderr, "Modo inválido: use 1 para codificar ou 2 para decodificar.\n");
        return 1;
    }

    return 0;
}