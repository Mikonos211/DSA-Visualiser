function insertionSort(arr){
    let n = arr.length
    for(let i = 1; i < n; i ++){
       tmp = arr[i];
       let j = i - 1;
       console.log("j:" +  j)

      console.log("tmp:" + tmp)
       while(j >= 0 && arr[j] > tmp){
        arr[j + 1] = arr[j];
        j--; 
        console.log(arr[j])
       }
       arr[j + 1] = tmp;
       console.log(arr)
       console.log("")
    }
}

// Wprowadz tablice wymagana do posegregowania:
let arr = [-1, 7, 3, 1, 9, 0]
insertionSort(arr)
console.log(arr)