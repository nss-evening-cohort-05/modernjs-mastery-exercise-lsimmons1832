$(document).ready(function() {
	const myCharacters = [];
	const myDetails = [];
	let xmen = [];
	let avengers = [];
	let guardians = [];




	$('body').on("click","nav", (e)=>{
		//determine which button was clicked
		//then call a new function based on id of click
		let selected = e.target.id;
		if (selected==='xmen') {
			getXMen();
		}else if(selected === 'avengers'){
			getAvengers();
		}else
		getGuardians();
	});

	const getXMen = () =>{
		//loop over characters array and grab XMen
		console.log("I called xmen");
		for (let i = 0; i < myCharacters.length; i++) {
			if(myCharacters[i].team_id === 0){
				xmen.push(myCharacters[i]);
			}
		}
		console.log('xmen array', xmen);
		writeToDom(xmen);	
	};
// console.log("what's in myComicBook?", myComicBook);

	const getAvengers = () =>{
		//loop over characters array and grab Avengers
		console.log("I called avengers");
			for (let i = 0; i < myCharacters.length; i++) {
			if(myCharacters[i].team_id === 1){
				avengers.push(myCharacters[i]);
			}
		}
		writeToDom(avengers);
	};

	const getGuardians = () =>{
		//loop over characters array and grab Guardians
		console.log("I called guardians");
			for (let i = 0; i < myCharacters.length; i++) {
			if(myCharacters[i].team_id === 2){
				guardians.push(myCharacters[i]);
			}
		}
		writeToDom(guardians);
	};

	const writeToDom = (data)=>{
		let outputString = "";
		let counter = 0;
		for(let i = 0; i < data.length; i++){
			if(counter%4 === 0){
				outputString += `<div class="row">`;
			}
			outputString += `<div class="col-xs-6 col-sm-3 card">`;
			outputString += `<h1>${data[i].name}</h1>`;
			if(data[i].gender_id === 0){
			outputString += `<section><img src='${data[i].image}' class="img-circle img-responsive female" alt="Responsive image">`;
			}else{
			outputString += `<section><img src='${data[i].image}' class="img-circle img-responsive male" alt="Responsive image">`;
			}	
			outputString += `<p>${data[i].description}</p></section></div>`;
			counter++;
			if(counter%4 === 0){
				outputString += `</div><div class="clearfix visible-xs-block"></div>`;
			}

		}

		$(".container").html(outputString);
	};

  const loadCharacters = () => {
      return new Promise((resolve, reject) => {
        $.ajax("/db/characters.json")
        .done((data1) => resolve(data1.characters))
        .fail((error1) => reject(error1));
        });
  };

   const loadGenders = () => {
      return new Promise((resolve, reject) => {
          $.ajax("/db/genders.json")
          .done((data2) => resolve(data2.genders))
          .fail((error2) => reject(error2));
      });
  };

     const loadTeams = () => {
      return new Promise((resolve, reject) => {
          $.ajax("/db/teams.json")
          .done((data3) => resolve(data3.teams))
          .fail((error3) => reject(error2));
      });
  };

  const checkTeam = (characters, teams) => { 
	const formAlliance = characters.team_id;
    const isMatchNumber = teams.id; 
    if (isMatchNumber === -1){ 
      return false;
    } else {
      return true;
    }
  };

  const checkGender = (characters, genders) =>{
  	const gender = characters.gender_id;
  	const gender_id = genders.id;
  	let isMatch = false;
  	if(gender && gender_id){
  		isMatch = true;
  	}
  	return isMatch;
  };

    loadCharacters().then((characters) => {
    characters.forEach((character) => {
      character.matches = []; 
      myCharacters.push(character);
    });


Promise.all([loadGenders(), loadTeams()])
	.then((data) => {
		data.forEach((dataSet)=>{
			dataSet.forEach((detail) =>{
			myDetails.push(detail);
			 });
		});
		for(let i = 0; i < myCharacters.length; i++){
			for (let j = 0; j < myDetails.length; j++) {
				if(checkTeam(myCharacters[i], myDetails[j])&& checkGender(myCharacters[i], myDetails[j])){
					myCharacters[i].matches.push(myDetails[j]);
				}
			}
		}
			}).catch((errors) => {
				alert(errors);
			console.log(errors);
		});
	});
	



});