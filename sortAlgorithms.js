

//Bubble
function bubbleSort(arr) {
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
function selectionSort(arr) {
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
//TODO todo fudido
function insertionSort(unsortedList) {
    var len = unsortedList.length;
    for (var i = 0; i < len; i++) {
        var tmp = unsortedList[i]; //Copy of the current element.
        /*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
        for (var j = i - 1; j >= 0 && (unsortedList[j] > tmp); j--) {
            //Shift the number
            unsortedList[j + 1] = unsortedList[j];
        }
        //Insert the copied number at the correct position
        //in sorted part.
        unsortedList[j + 1] = tmp;
    }
    return unsortedList;
}
//Merge
function mergeSort(arr)
{
	var len = arr.length;
	if (len < 2) return arr;
	var mid = Math.floor(len / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid);
	//send left and right to the mergeSort to broke it down into pieces
	//then merge those
	return merge(mergeSort(left), mergeSort(right));
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
	
	//remaining part needs to be addred to the result
	return result.concat(left.slice(l)).concat(right.slice(r));
}

//quick
function quickSort(arr){
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
    return quickSort(left).concat(pivot, quickSort(right));
}

//heap
function heapSort(array) {
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

