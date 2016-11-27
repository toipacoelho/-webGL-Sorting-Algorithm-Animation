//Bubble
function bubbleSort(arr, step) {
	var len = arr.length;
	for (var i = len - 1; i >= 0; i--) {
		for (var j = 1; j <= i; j++) {
			if (arr[j - 1] > arr[j]) {
				var temp = arr[j - 1];
				arr[j - 1] = arr[j];
				arr[j] = temp;

				return arr;
			}
		}
	}
	return arr;
}

function bubbleSort2(arr, step) {
	var len = arr.length;
	for (var i = len - 1; i >= 0; i--) {
		for (var j = 1; j <= i; j++) {
			if (arr[j - 1] > arr[j]) {
				var temp = arr[j - 1];
				arr[j - 1] = arr[j];
				arr[j] = temp;

				return arr;
			}
		}
	}
	return arr;
}

//Select
function selectionSort(arr, step) {
	var minIdx, temp, len = arr.length;

	for (var i = 0; i < len; i++) {
		minIdx = i;
		
		for (var j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) {
				minIdx = j;
			}
		}

		if(minIdx !== i)
		{
			temp = arr[i];
			arr[i] = arr[minIdx];
			arr[minIdx] = temp;

			return arr;
		}
	}

	return arr;
}

function selectionSort2(arr, step) {
	var minIdx, temp, len = arr.length;

	for (var i = 0; i < len; i++) {
		minIdx = i;
		
		for (var j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) {
				minIdx = j;
			}
		}

		if(minIdx !== i)
		{
			temp = arr[i];
			arr[i] = arr[minIdx];
			arr[minIdx] = temp;

			return arr;
		}
	}

	return arr;
}

//Insertion
function insertionSort(arr, step) {
    var len = arr.length;
    for (var i = step; i < len; i++) {
        var tmp = arr[i]; 
        for (var j = i - 1; j >= 0 && (arr[j] > tmp); j--) {        
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = tmp;
		return arr;
    }
    return arr;
}

function insertionSort2(arr, step) {
    var len = arr.length;
    for (var i = step; i < len; i++) {
        var tmp = arr[i]; 
        for (var j = i - 1; j >= 0 && (arr[j] > tmp); j--) {        
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = tmp;
		return arr;
    }
    return arr;
}

//Merge
function mergeSort(arr, step) {
	var len = arr.length;
	if (len < 2) return arr;
	var mid = Math.floor(len / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid);
	console.log(arr);
	arr = merge(mergeSort(left), mergeSort(right));
	return arr;
}

function merge(left, right) {
	var result = [],
		lLen = left.length,
		rLen = right.length,
		l = 0,
		r = 0;
	while (l < lLen && r < rLen) {
		if (left[l] < right[r]) {
			result.push(left[l++]);
		} else {
			result.push(right[r++]);
		}
	}
	return result.concat(left.slice(l)).concat(right.slice(r));
}

//quick
function quickSort(arr, step){
//if array is empty
    if (arr.length === 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    //go through each element in array
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
	console.log(arr);
    return quickSort(left).concat(pivot, quickSort(right));
}

//heap
function heapSort(array, step) {
    var swap = function(array, firstIndex, secondIndex) {
        var temp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temp;
    };
    var maxHeap = function(array, i) {
        var l = 2 * i;
        var r = l + 1;
        var largest;
        if (l < array.heapSize && array[l] > array[i]) {
            largest = l;
        } else {
            largest = i;
        }
        if (r < array.heapSize && array[r] > array[largest]) {
            largest = r;
        }
        if (largest != i) {
            swap(array, i, largest);
            maxHeap(array, largest);
        }
    };
    var buildHeap = function(array) {
        array.heapSize = array.length;
        for (var i = Math.floor(array.length / 2); i >= 0; i--) {
            maxHeap(array, i);
        }
    };
    buildHeap(array);
    for (var i = array.length-1; i >= 1; i--) {
        swap(array, 0, i);
        array.heapSize--;
        maxHeap(array, 0);
    }
    return array;
}
//shell

