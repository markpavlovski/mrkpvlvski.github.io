var testArray = ['4916-2600-1804-0530', '4779-252888-3972', '4252-278893-7978', '4556-4242-9283-2260'] ;

function IdentifyCard(inputArray){

	var maxLocation = 0;
	var maxSum = 0;	

	for (var i = 0; i < inputArray.length; i++){
		var currentCard = inputArray[i].replace(/-/g, '');
		var sumOfDigits = 0;
		for (var j = 0; j < currentCard.length; j++){
			sumOfDigits += Number(currentCard[j]);
		}
		if (sumOfDigits >= maxSum){
			maxLocation = i;
			maxSum = sumOfDigits;
		}
	}

	console.log(inputArray[maxLocation]);
	return inputArray[maxLocation];
}

IdentifyCard(testArray);
