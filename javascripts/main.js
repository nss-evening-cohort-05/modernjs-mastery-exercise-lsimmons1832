$(document).ready(() => {



$( "body" ).addClass( "background" );
$('.navbar-right').html(`<button type="submit" class="btn btn-default" id="0">X-Men</button>
			    <button type="submit" class="btn btn-default" id="1">The Avengers</button>
			    <button type="submit" class="btn btn-default" id="2">Guardians of the Galaxy</button>`);




	const writeToDom = (data, buttonId)=>{
		let outputString = "";

			console.log("button", data);
		for(let i = 0; i < data.length; i++){
			if(data[i].team_id == buttonId){
			outputString += `<div class="panel panel-default col-xs-3">`;
			// outputString += `<div class="panel-body">`;
			outputString += `<div class="panel-heading"><h2>${data[i].name}</h2></div>`;
			if(data[i].gender === "Female"){
			outputString += `<div class="panel-body"><img src='${data[i].image}' class="img-circle img-responsive female-img" alt="Responsive image">`;
			}else if(data[i].gender === "Male"){
			outputString += `<div class="panel-body"><img src='${data[i].image}' class="img-circle img-responsive male-img" alt="Responsive image">`;
			}	
			outputString += `<p>${data[i].description}</p></div></div>`;
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
					char.team_name = teams.name;
				}
				if(char.gender_id === genders.id){
					char.gender = genders.type;
				}	
				if(char.description === '' && char.gender === 'Female'){
					char.description = "abcde fghij klmno pqrst uvwxy z";
				}else if(char.description === '' && char.gender === 'Male'){
					char.description = '1234567890';
				}
			   });
			 });
		  });
			writeToDom(character, buttonId);
		 }).catch((errors) => {
			console.log(errors);
		});
};

  $("#0").click((event) => {
	dataGetter($(event.currentTarget)[0].id);
    console.log($(event.currentTarget));
	$("body").removeClass("background");
  });
  
   $("#1").click((event) => {
	dataGetter($(event.currentTarget)[0].id);
    console.log($(event.currentTarget));
	$("body").removeClass("background");
  });
  
    $("#2").click((event) => {
	dataGetter($(event.currentTarget)[0].id);
    console.log("I clicked here",$(event.currentTarget));
	$("body").removeClass("background");
  });

});