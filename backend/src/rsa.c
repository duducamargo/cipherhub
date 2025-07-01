#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h> // Para srand
#include <math.h> // Para sqrt

// Define __uint128_t para compatibilidade se não for automaticamente reconhecido
#ifndef __SIZEOF_INT128__
#error "Este código requer suporte a __uint128_t (compiladores GCC/Clang)."
#endif

typedef __uint128_t uint128_t;
typedef __int128_t int128_t;

// --- Funções Auxiliares de Bignum/Matemática ---

// Converte string para uint128_t
uint128_t str_to_uint128(const char *str)
{
    uint128_t res = 0;
    for (int i = 0; str[i] != '\0'; i++)
    {
        if (str[i] < '0' || str[i] > '9')
            return 0; // Basic validation
        res = res * 10 + (uint128_t)(str[i] - '0');
    }
    return res;
}

// Imprime uint128_t como string
void print_uint128(uint128_t n)
{
    if (n == 0)
    {
        printf("0");
        return;
    }
    char buffer[64]; // Max digits for 2^128 is 39, plus null terminator
    int i = 63;
    buffer[i--] = '\0';
    while (n > 0)
    {
        buffer[i--] = '0' + (n % 10);
        n /= 10;
    }
    printf("%s", &buffer[i + 1]);
}

// Máximo Divisor Comum (GCD)
uint128_t gcd(uint128_t a, uint128_t b)
{
    while (b != 0)
    {
        uint128_t temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Inverso Modular (Algoritmo Euclidiano Estendido)
uint128_t modinv(uint128_t e, uint128_t phi)
{
    int128_t t = 0, newt = 1;
    int128_t r = phi, newr = e;

    while (newr != 0)
    {
        int128_t q = r / newr;
        int128_t temp = newt;
        newt = t - q * newt;
        t = temp;

        temp = newr;
        newr = r - q * newr;
        r = temp;
    }

    if (r > 1)
        return 0; // No modular inverse
    if (t < 0)
        t += phi; // Ensure positive
    return (uint128_t)t;
}

// Exponenciação Modular (exponenciação rápida)
uint128_t mod_exp(uint128_t base, uint128_t exp, uint128_t mod)
{
    uint128_t result = 1;
    base %= mod;
    while (exp > 0)
    {
        if (exp & 1)
            result = (result * base) % mod;
        exp >>= 1;
        base = (base * base) % mod;
    }
    return result;
}

// Verifica se um número é primo (simplificado para números pequenos)
bool is_prime(uint128_t num)
{
    if (num <= 1)
        return false;
    if (num <= 3)
        return true;
    if (num % 2 == 0 || num % 3 == 0)
        return false;
    for (uint128_t i = 5; i * i <= num; i = i + 6)
    {
        if (num % i == 0 || num % (i + 2) == 0)
            return false;
    }
    return true;
}

// Gera um número primo aleatório dentro de um intervalo (simplificado)
uint128_t generate_random_prime(uint128_t min, uint128_t max)
{
    uint128_t num;
    srand(time(NULL)); // Seed random number generator
    while (true)
    {
        // Gerar um número aleatório no intervalo [min, max]
        num = (uint128_t)rand() * (uint128_t)rand(); // For larger numbers
        if (max - min > 0)
        { // Avoid division by zero if max == min
            num = min + (num % (max - min + 1));
        }
        else
        { // Handle case where max == min or interval is small
            num = min;
        }

        if (num % 2 == 0)
            num++; // Start from odd number if even

        while (!is_prime(num))
        {
            num += 2; // Check only odd numbers
            if (num > max)
            {                  // Loop back if we exceed max without finding prime
                num = min + 1; // Restart search, possibly from min+1
                if (num % 2 == 0)
                    num++;
            }
        }
        return num;
    }
}

// --- Geração de Chaves RSA para Demonstração ---
void generate_keys(uint128_t *p_out, uint128_t *q_out, uint128_t *n_out, uint128_t *e_out, uint128_t *d_out)
{
    uint128_t p, q, n, phi, e, d;

    // Use números primos maiores para que a criptografia seja visivelmente diferente de 0/1
    // Estes ainda são MUITO PEQUENOS para segurança real, mas são adequados para demonstração
    do
    {
        p = generate_random_prime(10000, 20000); // Exemplo de primos
    } while (!is_prime(p));

    do
    {
        q = generate_random_prime(20000, 30000); // Outro primo
    } while (!is_prime(q) || p == q); // Certifique-se que p != q

    n = p * q;
    phi = (p - 1) * (q - 1);

    // Expoente público comum
    e = 65537;
    // Garante que e é coprimo com phi
    while (gcd(e, phi) != 1)
    {
        e += 2; // Incrementa e até encontrar um coprimo
    }

    d = modinv(e, phi);

    // Se a geração de d falhar (muito raro se e e phi forem coprimos)
    if (d == 0)
    {
        // Fallback ou erro, para demonstração, podemos tentar novamente ou usar fixos
        p = 10000019; // Fallback para primos conhecidos
        q = 10000079;
        n = p * q;
        phi = (p - 1) * (q - 1);
        e = 65537;
        d = modinv(e, phi);
    }

    *p_out = p;
    *q_out = q;
    *n_out = n;
    *e_out = e;
    *d_out = d;
}

// --- Função Principal main ---

int main(int argc, char *argv[])
{
    // Uso esperado: rsa <mode> [args...]
    // Modos:
    //   1. "generate-keys" : rsa generate-keys
    //      Output: {"p": ..., "q": ..., "n": ..., "e": ..., "d": ...}
    //   2. "encrypt" : rsa encrypt <text> <n_str> <e_str>
    //      Output: {"encrypt": [..., ...]}
    //   3. "decrypt" : rsa decrypt <ciphertext_str> <n_str> <d_str>
    //      Output: {"decrypt": "..."}

    if (argc < 2)
    {
        fprintf(stderr, "Uso: %s <mode> [args...]\n", argv[0]);
        fprintf(stderr, "Modos:\n");
        fprintf(stderr, "  generate-keys\n");
        fprintf(stderr, "  encrypt <text> <n_str> <e_str>\n");
        fprintf(stderr, "  decrypt <ciphertext_str> <n_str> <d_str>\n");
        return 1;
    }

    const char *mode_str = argv[1];

    // --- MODO: GENERATE KEYS ---
    if (strcmp(mode_str, "generate-keys") == 0)
    {
        uint128_t p, q, n, e, d;
        generate_keys(&p, &q, &n, &e, &d);

        printf("{\"p\": \"");
        print_uint128(p);
        printf("\", \"q\": \"");
        print_uint128(q);
        printf("\", \"n\": \"");
        print_uint128(n);
        printf("\", \"e\": \"");
        print_uint128(e);
        printf("\", \"d\": \"");
        print_uint128(d);
        printf("\"}");
        return 0;
    }

    // --- Outros modos (encrypt/decrypt) requerem mais argumentos ---
    if (argc < 5)
    {
        fprintf(stderr, "Argumentos insuficientes para o modo '%s'.\n", mode_str);
        fprintf(stderr, "Uso: %s <mode> <text/ciphertext> <n_str> <key_str>\n", argv[0]);
        return 1;
    }

    const char *input_data_str = argv[2];
    uint128_t n_val = str_to_uint128(argv[3]);
    uint128_t key_val = str_to_uint128(argv[4]);

    if (n_val == 0)
    {
        fprintf(stderr, "Erro: Valor de n (módulo) inválido ou zero.\n");
        return 1;
    }

    // --- MODO: ENCRYPT ---
    if (strcmp(mode_str, "encrypt") == 0)
    {
        char msg_buffer[256];
        size_t input_len = strlen(input_data_str);
        if (input_len >= sizeof(msg_buffer))
        {
            input_len = sizeof(msg_buffer) - 1; // Truncate if too long
        }
        memcpy(msg_buffer, input_data_str, input_len);
        msg_buffer[input_len] = '\0';

        int num_chars = (int)strlen(msg_buffer);

        printf("{\"encrypt\": [");
        for (int i = 0; i < num_chars; i++)
        {
            uint128_t block = (unsigned char)msg_buffer[i];
            uint128_t encrypted_block = mod_exp(block, key_val, n_val); // 'key_val' here is 'e'
            print_uint128(encrypted_block);
            if (i < num_chars - 1)
                printf(", ");
        }
        printf("]}");
    }
    // --- MODO: DECRYPT ---
    else if (strcmp(mode_str, "decrypt") == 0)
    {
        char *rest = strdup(input_data_str);
        if (rest == NULL)
        {
            fprintf(stderr, "Erro: Falha na alocação de memória para descriptografia.\n");
            return 1;
        }

        uint128_t encrypted_blocks[256];
        int block_count = 0;

        char *token = strtok(rest, ",");
        while (token != NULL && block_count < 256)
        {
            encrypted_blocks[block_count++] = str_to_uint128(token);
            token = strtok(NULL, ",");
        }
        free(rest);

        unsigned char decrypted_msg[256];
        int current_pos = 0;

        for (int i = 0; i < block_count; i++)
        {
            uint128_t block = mod_exp(encrypted_blocks[i], key_val, n_val); // 'key_val' here is 'd'
            if (block > 255)
            { // Check if decrypted value is a valid ASCII char
                fprintf(stderr, "Erro: Valor descriptografado fora do range ASCII (0-255). Chave incorreta ou dado corrompido.\n");
                printf("{\"error\": \"Invalid decrypted value or incorrect key.\"}");
                return 1;
            }
            decrypted_msg[current_pos++] = (unsigned char)block;
        }
        decrypted_msg[current_pos] = '\0';

        printf("{\"decrypt\": \"%s\"}", (char *)decrypted_msg);
    }
    // --- MODO: INVÁLIDO ---
    else
    {
        fprintf(stderr, "Modo inválido. Use 'generate-keys', 'encrypt' ou 'decrypt'.\n");
        return 1;
    }

    return 0;
}