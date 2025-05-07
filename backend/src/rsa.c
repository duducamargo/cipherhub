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

int main()
{
    int opcao;
    printf("Escolha uma opcao:\n");
    printf("1. Gerar hash SHA-256 de um arquivo\n");
    printf("2. Gerar hash SHA-256 de uma mensagem\n");
    printf("3. Verificar hash SHA-256 de um arquivo\n");
    printf("4. Sair\n");
    scanf("%d", &opcao);
    getchar(); 
    return opcao;
}