#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define SIZE 9

//int result[SIZE][SIZE];
//
//void init() {
//    int i, j;
//    for (i = 0; i < SIZE; i++) {
//        for (j = 0; j < SIZE; j++) {
//            result[i][j] = 0;
//            printf("%d\t", result[i][j]);
//        }
//        printf("\n");
//    }
//}

int main() {
    //init();
    int a[SIZE];
    int **arr, i, j;
    arr = (int**) malloc(sizeof(int) * SIZE * SIZE);

    for (i = 0; i < SIZE; i++) {
        for (j = 0; j < SIZE; j++) {
            arr[i][j] = 0;
            printf("%d\t", arr[i][j]);
        }
        printf("\n");
    }
    return EXIT_SUCCESS;
}