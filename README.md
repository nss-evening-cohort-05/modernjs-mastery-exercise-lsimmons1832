# ModernJS Mastery Exercise

##Project Requirements
[Project Specifications](https://github.com/nss-evening-cohort-05/modernjs-mastery-exercise-lsimmons1832/blob/master/instructions.md)
	* Project should be free of grunt errors
	* Utilize ES6 (let, const, fat arrows)
	* Your project should use promises for ALL ajax calls
	* Utilize Bootstrap for navbar
		- Should have Marvel logo for brand
		- Should have a button for each team in the teams.json file
		- Should have a large Marvel logo in the middle of the page
		
##Expected Functionality
	* The large Marvel logo should toggle off when buttons are clicked
	* The click event should call a function called dataGetter that has a Promise.all
	* The Promise.all should resolve 3 functions that get the data from the json files
	* dataGetter should pass a SINGLE array to the writeDom function
	* The writeDom function should write everything to the DOM
	* If there is no description for a character (ie description is "") your code should change the description as follows:
		- A female character with no description should get a description of "abcde fghij klmno pqrst uvwxy z"
		- A male character with no description should get a description of "1234567890"
		
## Style requirements
	* Each character should be displayed in a bootstrap panel
	* Each character's image should be a circle and have a border color of:
		- Blue if the character is Male
		- Pink if the character is Female
	* There should be 4 panels in each row
	* Each row should have a bootstrap row class
	
## Technologies
	- HTML5
	- SASS
	- Bootstrap
	- JQUERY
	- GRUNT

	
![Marvel Screengrab](https://raw.githubusercontent.com/nss-evening-cohort-05/modernjs-mastery-exercise-lsimmons1832/master/images/Screenshot.PNG)

## Accessing Project
	- Clone down project
	- Install bower 
	- install npm