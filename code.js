const arrSize = document.getElementById("ArrRange");
const SpeedRange = document.getElementById("SpeedRange")
let array = [];
let sortedIndices = [];
let shouldStop = false;


// General functions
arrSize.addEventListener("input", () =>{
    shouldStop = true;
    sortedIndices = [];
    array = [];
    for(let i = 0; i < +arrSize.value; i++){
        array[i] = Math.floor(Math.random() * 89) + 10;
    }
    showbars();
})

function showbars(move){
    conteiner.innerHTML = "";
    for(let i =0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height= array[i]+"%";
        bar.textContent = array[i];
        bar.classList.add("bars")
            if (sortedIndices.includes(i)) {
                bar.classList.remove("bars");
                bar.classList.add("sorted1");
            }
        if (move && move.indices.includes(i)) {
            switch (move.type) {
                case "swap":
                    bar.style.backgroundColor = "#DDA853";
                    bar.style.color = "#183B4E";
                    break;

                case "compere":
                    bar.style.backgroundColor = "#DDA853";
                    bar.style.color = "black";
                    break;

                case "select-min":
                    bar.style.backgroundColor = "green";
                    bar.style.color = "#183B4E";
                    break;
            }
        }
        conteiner.appendChild(bar);
    }
}

function animate(moves){
    if(shouldStop || moves.length === 0){
        showbars();       
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if(move.type =="swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }

    if (move.type === "sorted") {
        sortedIndices.push(i); 
    }

    showbars(move);

    const speed = +SpeedRange.value;

    setTimeout(() => animate(moves), speed);
}

//Bubble Sort Functions
function Bubbleplay(){
    shouldStop = false;
    const copy = [...array];
    const moves = bubleSort(copy);
    animate(moves);
}

function bubleSort(arr){
    const moves = [];
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0 ; j < arr.length - i - 1 ; j++){
            moves.push({ type: "compere", indices:[j,j+1]})
            if(arr[j] > arr[j + 1]){
                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                moves.push({ type: "swap" , indices:[j,j+1]})
            }
        }
    }
    return moves;
}

//Selection sort Functions
function SelectionPlay(){
    shouldStop = false
    const copy = [...array];
    const steps = SelectionSort(copy);
    animate(steps);
}


function SelectionSort(arr){
    const steps = [];
    for(let i = 0; i < arr.length - 1; i++){
        let min = i; 
        steps.push({ type: "select-min", indices: [min] });
        for(let j = i + 1; j < arr.length; j++){
            steps.push({type: "compere", indices:[min, j]});
            if(arr[min] > arr[j]){
                min = j;
                steps.push({ type: "select-min", indices: [min] });
            }    
        }
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] =tmp;
            steps.push({ type: "swap", indices: [i, min] });
            steps.push({ type: "sorted", indices: [i] });
    }
    return steps;
}


// Radix Sort Functions

function RadixPlay(){
    shouldStop = false;
    const copy = [...array];
    const moves = radixSort(copy);
    animate(moves);
}

function radixSort(arr){
    let maxdigit = +findLargest(arr);

    for(let i = 0; i < maxdigit ; i ++){
        let digitBuckets = Array.from({ length: 10 }, () => [])

        for (let j = 0; j < arr.length; j ++){
            let cyfra = getDigit(arr[j], i );
            digitBuckets[cyfra].push(arr[j])
        }
        arr = [].concat(...digitBuckets);
        console.log(arr)
    }
    return arr;
}


function getDigit(num, palce){
    return Math.floor(num / Math.pow(10, palce)) % 10;
}

function findLargest(arr){
    let max = 0;
    arr.forEach(element => {
        if(element > max){
            max = element
        }
    });
    let lengthOfMax = max.toString().length;
    return lengthOfMax;
}