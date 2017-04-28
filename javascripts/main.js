$(document).ready(function() {
	const myCharacters = [];
	const myDetails = [];
	let xmen = [];
	let avengers = [];
	let guardians = [];

//const outputContainer = $(".container");



	$('body').on("click","nav", (e)=>{
		//determine which button was clicked
		//then call a new function based on id of click
		let selected = e.target.id;
		//console.log('event', e);
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
			//myCharacters[i]
			if(myCharacters[i].team_id === 0){
				xmen.push(myCharacters[i]);
			}
		}
		writeToDom(xmen);	
	};
// console.log("what's in myComicBook?", myComicBook);

	const getAvengers = () =>{
		//loop over characters array and grab Avengers
		console.log("I called avengers");
			for (let i = 0; i < myCharacters.length; i++) {
			//myCharacters[i]
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
			//myCharacters[i]
			if(myCharacters[i].team_id === 2){
				guardians.push(myCharacters[i]);
			}
		}
		writeToDom(guardians);
	};

	const writeToDom = (data)=>{
		let outputString = "";
		for(let i = 0; i < data.length; i++){
			outputString += `<div>${data[i].name}</div>`
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
  	let isMatch = true;
  	if(gender && !gender_id){
  		isMatch = false;
  	}
  	return isMatch;
  };

    loadCharacters().then((characters) => {
    characters.forEach((character) => {
      character.matches = []; 
      myCharacters.push(character);
      //console.log("myCharacters array after push", myCharacters);
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
			//console.log("this is the Array",myCharacters);
			//writeToDom(myCharacters);
			}).catch((errors) => {
				alert(errors);
			console.log(errors);
		});
	});
	



});