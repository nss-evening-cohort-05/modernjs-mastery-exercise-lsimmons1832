$(document).ready(function() {

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
		//loop over myComics array and grab XMen
		console.log("I called xmen");
	};

	const getAvengers = () =>{
		//loop over myComics array and grab Avengers
		console.log("I called avengers");
	};

	const getGuardians = () =>{
		//loop over myComics array and grab Guardians
		console.log("I called guardians");
	};

  const loadCharacters = () => {
      return new Promise((resolve, reject) => {
        $.ajax("/db/characters.json")
        .done((data1) => resolve(data1))
        .fail((error1) => reject(error1));
        });
  };

   const loadGenders = () => {
      return new Promise((resolve, reject) => {
          $.ajax("/db/genders.json")
          .done((data2) => resolve(data2))
          .fail((error2) => reject(error2));
      });
  };

     const loadTeams = () => {
      return new Promise((resolve, reject) => {
          $.ajax("/db/teams.json")
          .done((data3) => resolve(data3))
          .fail((error3) => reject(error2));
      });
  };

const myComics = [];

Promise.all([loadCharacters(), loadGenders(), loadTeams()])
	.then((data) => {
			myComics.push(data);
			console.log(myComics);
			}).catch((errors) => {
				alert(errors);
			console.log(errors);
		});
	



});