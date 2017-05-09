$(document).ready(() => {



$( "body" ).addClass( "background" );
$('.navbar-right').html(`<button type="submit" class="btn btn-default" id="xmen">X-Men</button>
			    <button type="submit" class="btn btn-default" id="avengers">The Avengers</button>
			    <button type="submit" class="btn btn-default" id="gaurdians">Guardians of the Galaxy</button>`);






	const writeToDom = (data, buttonId)=>{
		let outputString = "";
		let counter = 0;
		for(let i = 0; i < data.length; i++){
			if(counter%4 === 0){
				outputString += `<div class="row">`;
			}
			outputString += `<div class="col-xs-6 col-sm-3 card">`;
			outputString += `<section><h2>${data[i].name}</h2>`;
			if(data[i].gender_id === 0){
			outputString += `<img src='${data[i].image}' class="img-circle img-responsive female-img" alt="Responsive image">`;
			outputString += `<p class="female">${data[i].description}</p></section></div>`;
			}else{
			outputString += `<img src='${data[i].image}' class="img-circle img-responsive male-img" alt="Responsive image">`;
			outputString += `<p class="male">${data[i].description}</p></section></div>`;
			}	
			counter++;
			if(counter%4 === 0){
				outputString += `</div><div class="clearfix visible-xs-block"></div>`;
			}

		}

		$(".outputContainer").html(outputString);
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


const dataGetter = (buttonId) => {
Promise.all([loadCharacters(), loadGenders(), loadTeams()])
	.then((data) => {
	let character = data[0];
	let gender = data[1];
	let teams = data[2];
	
		character.forEach((char)=>{
			teams.forEach((teams) =>{
			gender.forEach((genders)=>{
				if(char.team_id === teams.id){
					char.team_name = teams.name
				}
				if(char.gender_id === genders.id){
					char.gender = genders.type;
				}	
				if(char.description === '' && char.gender === 'Female'){
					char.description = "abcde fghij klmno pqrst uvwxy z"
				}else if(char.description === '' && char.gender === 'Male'){
					char.description = '1234567890';
				}
			   });
			 });
			writeToDom(character, buttonId);
		   });
		 }).catch((errors) => {
			console.log(errors);
		});
}

  $("#xmen").click((event) => {
	dataGetter($(event.currentTarget)[0].id);
    console.log($(event.currentTarget));
	$("body").removeClass("background");
  });
  
   $("#avengers").click((event) => {
	dataGetter($(event.currentTarget)[1].id);
    console.log($(event.currentTarget));
	$("body").removeClass("background");
  });
  
    $("#gaurdians").click((event) => {
	dataGetter($(event.currentTarget)[2].id);
    console.log($(event.currentTarget));
	$("body").removeClass("background");
  });

});