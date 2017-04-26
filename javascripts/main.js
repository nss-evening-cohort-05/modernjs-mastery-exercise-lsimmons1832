$(document).ready(function() {

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

Promise.all([loadCharacters(), loadGenders(), loadTeams()])
	.then((data) => {
			myComics = data;
			console.log(myComics);
			}).catch((errors) => {
				alert(errors);
			console.log(errors);
		});
	



});