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
    clearBucketDiv()
    for(let i = 0; i < +arrSize.value; i++){
        array[i] = Math.floor(Math.random() * 89) + 10;
    }
    showbars();
})

function clearBucketDiv(){
    const bucketDiv = document.getElementById("bucket");
    bucketDiv.innerHTML = ""

}

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
function createBucets(){
    bucket.innerHTML = "";
    for(let i =0; i < 10; i++){
        const buc = document.createElement("div");
        buc.classList.add("bucket")
        buc.id = i
        bucket.appendChild(buc);
    }
}



function RadixPlay(){
    createBucets();
    shouldStop = false;
    const copy = [...array];
    const moves = radixSort(copy);
    animateRadix(moves);
}

function animateRadix(moves){
    if(shouldStop || moves.length === 0){
        showbars();       
        return;
    }

    const move = moves.shift();
   
    if(move.type === "re"){
        clearBuckets();
    }
    if (move.type === "toSwap") {
        array = [...move.indices];  
        showbars();                 
    } else {
        showbars(move);
        if (move.type === "put") {
            const bucketElement = document.getElementById(move.bucketIndex.toString());
            if (bucketElement) {
                const elem = document.createElement("div");
                elem.textContent = move.value;
                elem.classList.add("bucket-item");
                bucketElement.appendChild(elem);
            }
        }          
    }


    const speed = +SpeedRange.value;

    setTimeout(() => animateRadix(moves), speed);


}

function radixSort(arr){
    let steps = [];
    let maxdigit = +findLargest(arr);


    for(let i = 0; i < maxdigit ; i ++){
        let digitBuckets = Array.from({ length: 10 }, () => [])
        for (let j = 0; j < arr.length; j ++){
            let cyfra = getDigit(arr[j], i );
            digitBuckets[cyfra].push(arr[j])
            steps.push({ type: "swap", indices: [j, j] });
            steps.push({ 
                type: "put", 
                indices: [j], 
                value: arr[j], 
                bucketIndex: cyfra 
            }); 
        }
        steps.push({ type: "re", indices: [i]})
        
        arr = [].concat(...digitBuckets);
        steps.push({ type: "toSwap", indices: arr })
    }
        return steps;
}

function clearBuckets() {
    const buckets = document.querySelectorAll(".bucket-item");
    buckets.forEach(bucket => {
        bucket.remove();
    });
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