window.onload= init;

//ICONE DE LA POUBELLE
const iconURL = 'https://icons.veryicon.com/png/o/commerce-shopping/read/delete-181.png';



// The game manager as a global variable
let cm;  


function init() { 
	// create an instance of the game manager
	cm = new GameManager();
  	cm.addTestData();
  	cm.printGamesToConsole();

	  // Display games in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayGamesAsATable("games");
	}


function formSubmitted() {
	
	let name = document.querySelector("#name");
    let editeur = document.querySelector("#éditeur");
  	let email = document.querySelector("#email");
    let cat = document.querySelector("#catégorie");
	let image = document.querySelector("#image");

	
	let newGame = new Game(name.value, email.value, editeur.value, cat.value, image.value);
	cm.add(newGame);
	
	name.value = "";
	email.value = "";
    editeur.value = "";
    cat.value = "";
	image.value = "";
	
	
	// refresh the html table
	cm.displayGamesAsATable("games");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayGamesAsATable("games");
}

function loadList() {
	cm.load();
  	cm.displayGamesAsATable("games");
}

// 
class Game {
	constructor(name, email, editeur, cat, image) {
		this.name = name;
		this.email = email;
        this.editeur = editeur;
        this.cat = cat;
		this.image = image;
	}
}

class GameManager {
	constructor() {
		// when we build the game manager, it
		// has an empty list of games
		this.listOfGames = [];
	}
	// DONNÉES DE TESTS 
	addTestData() {
		var c1 = new Game("SKYRIM", "PC, PS3, PS4", "BETHESDA", "RPG", "https://static.actugaming.net/media/2016/03/the-elder-scrolls-skyrim-game-cover.jpg");
  		var c2 = new Game("METRO 2033", "PC, PS3, PS4", "THQ", "FPS", "https://image.api.playstation.com/cdn/UP2047/CUSA00623_00/CDKT8KfSKuoRENogIW12qtoRJCpUPItk.png");
  		var c3 = new Game("ELDEN RING", "PS5, PC", "BANDAI", "RPG", "https://image.api.playstation.com/vulcan/ap/rnd/202107/1612/Y5RHNmzAtc6sRYwZlYiKHAxN.png");
  		var c4 = new Game("FAR CRY 3", "PS3, PC", "UBISOFT", "FPS","https://s1.gaming-cdn.com/images/products/96/orig-fallback-v1/jeu-uplay-far-cry-3-cover.jpg?v=1625493046");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of games by Name
		this.sort();
	}
	
	// Will erase all games
	empty() {
		this.listOfGames = [];
	}
	
	add(game) {
		this.listOfGames.push(game);
	}
	
	
	remove(game) {
		for(let i = 0; i < this.listOfGames.length; i++) { 
			var c = this.listOfGames[i];

			if(c.email === game.email) {
				// remove the game at index i
				this.listOfGames.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	 
	//  TRI //
	sort() {
		this.listOfGames.sort(GameManager.compareByName);
	}
	
	
	static compareByName(c1, c2) {
		// TRI PAR ORDRE ALPHABETIQUE A--> Z
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}

		// TRI PAR ORDRE INVERSE Z-->A
	static compareByName2(c1, c2) {
		
		if (c1.name < c2.name)
     		return 1;
		
    	if (c1.name > c2.name)
     		return -1;
  
    	return 0;
	}
	
	printGamesToConsole() {
		this.listOfGames.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.games !== undefined) {
			// the array of games is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfGames = JSON.parse(localStorage.games);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of games to JSON
		localStorage.games = JSON.stringify(this.listOfGames);
	} 
	//
  	displayGamesAsATable(idOfContainer, gamesArr = null) {
		  
		if (gamesArr === null)
		gamesArr = this.listOfGames;
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(gamesArr.length === 0) {
			container.innerHTML = "<p>No games to display!</p>";
			// stop the execution of this method
			return;
		}  
/*-----------------------------------------------------*/
    	// creates and populate the table with users
    	var table = document.createElement("table");

// TITRES HEADERS //
		let header1 = document.createElement("th")
		let header2 = document.createElement("th")
		let header3 = document.createElement("th")
		let header4 = document.createElement("th")
		let header5 = document.createElement("th")
		let header6 = document.createElement("th")

		
		// RAJOUT D'UN BOUTON POUR TRIER//
		header1.innerHTML = 'TITRE DU JEU <div id=select name="sortBy"id="sortBy">▲</div><div id=select2 name="sortBy"id="sortBy">▼</div>';
		
		
		
		
		
		
		
		//
		header2.innerHTML = "DISPONIBLE SUR ";
		header3.innerHTML = "EDITEUR";
		header4.innerHTML = "TYPE";
		header5.innerHTML = "JAQUETTE";
		header6.innerHTML = "";

    	


     	// ICI ON COLLE LES TITRES DANS LE TABLEAU
     	container.append(table);
		 (table).append(header1)
		 table.appendChild(header2)
		 table.appendChild(header3)
		 table.appendChild(header4)
		 table.appendChild(header5)
		 table.appendChild(header6)
		 
		
		 
/*-----------------------------------------------------*/
    	gamesArr.forEach((currentGame, index) => {
        	// creates a row
        	var row = table.insertRow();
//
			row.innerHTML = "<td>" + currentGame.name + "</td>"
							+ "<td>" + currentGame.email + "</td>"
                            + "<td>" + currentGame.editeur + "</td>"
                            + "<td>" + currentGame.cat + "</td>" 
							//POUR LES IMAGES//
							+ "<td><img class='img2' src='" + currentGame.image + "'</img></td>"
							
							
							// CREER BUTTON DE SUPPRESSION 
							
							
							let iconCell = document.createElement('td');
							let trashBin = document.createElement('img');
							trashBin.src = iconURL;
							trashBin.dataset.gameId = index;
							iconCell.append(trashBin);
							
							// ON RAJOUTE L'ICONE DANS LA TABLE
							row.append(iconCell);
     	});
  
		 // POUR LA FONCTION DE RECHERCHE ->
		 document.querySelector('#gameSearch').addEventListener('input', (event) => {
			findGame(event.target.value);
		})
		 function findGame(name) {
			const games = cm.listOfGames;
			const regex = new RegExp(`${name}`, 'i')
			const resultat = games.filter(game => game.name.match(regex));
			console.log(resultat);
		
			cm.displayGamesAsATable('games', resultat)
		}


// POUR TRIER ON RAJOUT EVENT -> LORSQUE CLICK= DEMARRE LA FONCTION TRI A-Z

		document.querySelector('#select').addEventListener('click', (event) => {
				cm.listOfGames.sort(GameManager.compareByName);
			cm.displayGamesAsATable('games');
		})
//LORSQUE CLICK = DEMARRE LA FONCTION TRI INVERSE Z->A
		document.querySelector('#select2').addEventListener('click', (event) => {
			cm.listOfGames.sort(GameManager.compareByName2);
		cm.displayGamesAsATable('games');
	})
	//  CLICK IMAGE POUBELLE = SUPPRIMER 
document.querySelectorAll('img').forEach((element) => {
	element.addEventListener('click', () => {
		this.remove(gamesArr[element.dataset.gameId]);
		this.displayGamesAsATable('games');
	})
})
}
}
// BOUTTON OUVERTURE/ FERMETURE FORMULAIRE
function Openform(){
  document.getElementById('form1').style.display = '';

}
function closeForm() {
	document.getElementById("form1").style.display = "none";
  }

  function Openform2(){
	document.getElementById('form2').style.display = '';
  
  }
  function closeForm2() {
	  document.getElementById("form2").style.display = "none";
	}
  