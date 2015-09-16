var emacs = require('./commands/emacs.js');
var whoami = require('./commands/whoami.js');
var cat = require('./commands/cat.js');
var dir = require('./commands/dir.js');

function blinkCursor() {
	if($('.cursor').text() === '|') {
		$('.cursor').text('')
	}
	else {
		$('.cursor').text('|');
	}
	setTimeout(blinkCursor, 500);
}

function handleWeirdCharacters(event) {
	if(event.keyCode === 8) {
		$('.typed-content').text($('.typed-content').text().substring(0, $('.typed-content').text().length - 1));
		event.preventDefault();
	}
}

function printPrompt() {
	$('.typed-content').removeClass("typed-content").addClass("oldContent");
	$('.cursor').remove();
	$('body').append('<span class="blue">{ ~ }</span>');
	$('body').append('<span class="red"> &gt;&gt;</span> ');
	$('body').append('<span class="typed-content"></span>');
	$('body').append('<span class="cursor">|</span>');
	window.scrollTo(0,document.body.scrollHeight);
}

function handleInput(event) {
	//Handles ALL typable keys (Trying to handle then individually was getting... weird.)
	if(event.charCode && event.which !== 13) {
		$('.typed-content').text($('.typed-content').text() + String.fromCharCode(event.charCode));
		return;
	}
	
	if(event.which === 13) {
		var text = $('.typed-content').text();
		var split = text.split(" ");
		var command = split[0];
		var args = split.slice(1, split.length);
		processCommand(command, args);
	}
}

function handleRightClick(event) {
	if(event.button !== 2) {
		return;
	}
	document.execCommand('copy');
}

$(document).ready(function() {
	setTimeout(blinkCursor, 500);
	$('body').keypress(handleInput);
	$('body').keydown(handleWeirdCharacters);
})

function processCommand(command, args) {
	$('body').append('<br />');
	
	switch(command) {
		case '':
			printPrompt();
			break;
		case 'emacs':
			emacs.execute(args, processCommandCallback);
			break;
		case 'whoami':
			whoami.execute(args, processCommandCallback);
			break;
		case 'cat':
			cat.execute(args, processCommandCallback);
			break;
		case 'dir':
			dir.execute(args, processCommandCallback);
			break;
		default:
			$('body').append('<span class="unknown-command">waff: unknown command ' + command);
			processCommandCallback();
			break;
	}
}

function processCommandCallback() {
	$('body').append('<br />');
	printPrompt();
}