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