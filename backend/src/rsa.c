#include <stdio.h>

// Função para calcular o MDC (Máximo Divisor Comum)
int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}


// Algoritmo estendido de Euclides para inverso modular
int modinv(int e, int phi) {
    int t = 0, newt = 1;
    int r = phi, newr = e;
    while (newr != 0) {
        int quotient = r / newr;
        int temp = newt;
        newt = t - quotient * newt;
        t = temp;

        temp = newr;
        newr = r - quotient * newr;
        r = temp;
    }
    if (r > 1) return -1;  // sem inverso
    if (t < 0) t += phi;
    return t;
}

// Função para exponenciação modular: base^exp % mod
int mod_exp(int base, int exp, int mod) {
    int result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1)
            result = (result * base) % mod;
        exp = exp >> 1;
        base = (base * base) % mod;
    }
    return result;
}

int main() {
    // === Etapa 1: Gerar chaves ===
    int p = 61;  // primo 1
    int q = 53;  // primo 2
    int n = p * q;           // 3233
    int phi = (p - 1) * (q - 1);  // 3120

    int e = 17;  // chave pública (escolhida)
    if (gcd(e, phi) != 1) {
        printf("Erro: 'e' não é coprimo de φ(n)\n");
        return 1;
    }

    int d = modinv(e, phi);  // chave privada
    if (d == -1) {
        printf("Erro ao calcular o inverso modular\n");
        return 1;
    }

    printf("Chave pública: (e=%d, n=%d)\n", e, n);
    printf("Chave privada: (d=%d, n=%d)\n", d, n);

    // === Etapa 2: Criptografar ===
    int mensagem = 89;  // número a ser criptografado (deve ser < n)
    int criptografada = mod_exp(mensagem, e, n);
    printf("\nMensagem original: %d\n", mensagem);
    printf("Mensagem criptografada: %d\n", criptografada);

    // === Etapa 3: Descriptografar ===
    int descriptografada = mod_exp(criptografada, d, n);
    printf("Mensagem descriptografada: %d\n", descriptografada);

    return 0;
}