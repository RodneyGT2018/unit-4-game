$(document).ready(function() {

	// Create an array to hold the crystal image paths
	crystals = ["assets/images/ruby.jpg","assets/images/blue diamond.jpeg","assets/images/yellowtopaz.png","assets/images/emerald.jpg"];

	// Create variables for the items displaying data on the DOM and send the values for the wins and losses to the respective id
	var wins = 0;
	var losses = 0;
	$("#win").text(wins);
	$("#loss").text(losses);
	
	// Since this will be equal to the result of different if/else formulas, create it for now and use a function to configure the display results
	var counter = 0;

	// Functions to run the game.  "newCrystals" will establish the values for the crystals and "newGame" will program what happens when a new game starts
	newCrystals();
	newGame();


	// Start a function to for assigning the random value of the newCrystals and the capped value
	function newCrystals () {
	
	// Create "numbers" variable to house the values of the newCrystals
		var numbers = []
		
	// For the 4 newCrystals, cap the random number assigned for each newCrystal number at 12 with a variable called "randomNumber" 
		while(numbers.length < 4){
			var randomNumber = Math.ceil(Math.random()*12)
			var found = false;
	
	// Set up a for-loop to go through each crystal's value ("number") and give it a "randomNumber" that is generated above and then start the loop over until it gets through all of the newCrystals
			for (var i=0; i < numbers.length; i++){
			if (numbers[i] === randomNumber){
				found = true; break
			}
			}
		if(!found)numbers[numbers.length]=randomNumber;
		}

	// Hide the random numbers created for each crystal in the console log
		console.log(numbers);		


	// Need the "crystals" array above to display the images and contain the values randomly generated. 
		for (i = 0; i < numbers.length; i++) {
			
			// Create variable for the image tag
			var imageCrystal = $("<img>");  
			
			// Add the attributes to find the images and then style and populate them
			imageCrystal.attr("src", crystals[i]);
			imageCrystal.addClass("crystalImage")
			imageCrystal.attr("alt", "crystals");
			imageCrystal.attr("data-num", numbers[i]);
	
			// Grab the "crystals" id and put the "imageCrystal" variable's properties inside that div
			$("#crystals").append(imageCrystal);
		}
	}

	function newGame() {

	// Start the counter at 0 and display it on the DOM in the id "yourScore"
		counter = 0;
		$("#yourScore").text(counter);

	// Create a random number with a minimum and a maximum
		function randomIntFromInterval(min,max){
		   	return Math.floor(Math.random()*(max-min+1)+min);
			}
	// Set the min and max number range of the winning number between 19 and 120 and assign that to a new variable called "winningNum"
		var winningNum = randomIntFromInterval(19,120);
	
	// Send the "winningNum" to the DOM in the "compNum" div through its "value" class
		$(".value").text(winningNum);

	// Go get the crystalImage class created above and make the Total Score "counter" increase when the crystal is clicked by the randomly assigned value of the crystal above
		$(".crystalImage").on('click', function(){
		    counter = counter + parseInt($(this).data("num"));
	
	// Populate the score with the counter value from above and display it in the id "yourScore"
		    $("#yourScore").text(counter);

	// Set the rules on what happens if the "counter" is equal to the "winningNum", send text that "You won!!!!" to the DOM in the id named "status", and increase the number of wins on the DOM
		    if (counter == winningNum){
		      $("#status").text("You won!!!!");
		      wins ++;
		      $("#win").text(wins);
	
	// Empty the values in the crystals once you win
			  $("#crystals").empty();
		      newCrystals();
		      newGame();
	
	// Set the else rules on what happens if the "counter" goes over the "winningNum", send a "You lost!" message to the DOM, and increase the losses on the DOM
		    } else if (counter > winningNum){
		        $("#status").text("You lost!")
		        losses ++;
		        $("#loss").text(losses);
	
	// Empty the values in the crystals once you lose
		        $("#crystals").empty();
		        newCrystals();
		        newGame();
		    }
		});
	}

});