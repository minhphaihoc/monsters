; (function (window, document, undefined) {
	'use strict';
	// The monsters and socks
	var monsters = [
		'sock!',
		'monster1.svg',
		'monster2.svg',
		'monster3.svg',
		'monster4.svg',
		'monster5.svg',
		'monster6.svg',
		'monster7.svg',
		'monster8.svg',
		'monster9.svg',
		'monster10.svg',
		'monster11.svg'
	];
	var shuffledMonsters = [];
	var status = 'playing';
	var monstersFound = 0;
	var app = document.querySelector('#app');

	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param  {Array} array The array to shuffle
	 * @return {String}      The first item in the shuffled array
	 */
	var shuffle = function (array) {

		var currentIndex = array.length;
		var temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;

	};

	var resetData = function () {
		status = 'playing';
	 	monstersFound = 0;
		shuffledMonsters = shuffle(monsters.slice());
	};

	var startGame = function () {
		// Reset data everytime user starts a new game
		resetData();
		var content = '';

		// Loop through data and render the markup
		shuffledMonsters.forEach(function (monster) {
			var monsterImage = monster !== 'sock!' ? '<img src="img/' + monster + '" class="image monster-image">' : '';
			content +=
				'<div class="grid">' +
					'<div class="door">' +
						'<img src="img/door.svg" class="image door-image">' +
						monsterImage +
					'</div>' +
				'</div>';
		});
		app.innerHTML = '<div class="row">' + content + '</div>';
	};

	var clickHanler = function (event) {

		// Check if user clicks on start game button or not
		if (event.target.matches("#start-game")) {
			startGame();
		} else {
			// Bail if user doesn't click on a door or an opened door
			var door = event.target.closest('.door');
			if (!door || door.classList.contains('is-opened')) return;

			// Open the door
			door.classList.add('is-opened');

			calculateStatus(door);
		}
	};

	var calculateStatus = function(door) {
		var monster = door.querySelector('.monster-image');

		// If user found a monster
		if (monster) {
			monstersFound++;

			// If user found all monsters, change status to "win"
			if (monstersFound === shuffledMonsters.length - 1) {
				status = 'win';
			}
		} else {
			// If user found a sock, change status to "lose"
			status = 'lose';
		}

		// Show the result right away if status is "win" or "lose"
		showResult(status);
	};

	var renderCongratsMessage = function () {
		app.innerHTML = '<h2>Congrats! You\'re amazing.</h2>' +
			'<p><img src="img/congrats.gif" alt="Congrats Image"></p>' +
			'<button id="start-game" class="btn">Play Again</button>';
	};

	var renderFailMessage = function () {
		app.innerHTML = '<h2>Sorry. It\'s just a bad day not a bad life.</h2>' +
			'<p><img src="img/sorry.gif" alt="Sorry Image"></p>' +
			'<button id="start-game" class="btn">Play Again</button>';
	};

	var showResult = function (status) {
		if (status === 'win') {
			renderCongratsMessage();
		} else if (status === 'lose') {
			renderFailMessage();
		}
	};

	// Start a new name when the page loaded
	startGame();

	// Listen to click event
	document.addEventListener('click', clickHanler, false);
})(window, document);
