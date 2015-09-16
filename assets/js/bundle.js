(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var state = require('../core/state.js');

module.exports.execute = function(args) {
	if(!args || args.length === 0 || !args[0]) {
		$('body').append("This version of cat does not have interactive mode");
		return;
	}
	
	var dir = args[0];
	if(dir.indexOf('/') !== 0) {
		dir = state.getCwd() + dir;
	}
	
	$.get('/assets/filesystem' + dir, function(data) {
		$('body').append(data);
	})
}
},{"../core/state.js":5}],2:[function(require,module,exports){
module.exports.execute = function(args) {
	$('body').append('Eww, who uses emacs? Vi master race.');
}
},{}],3:[function(require,module,exports){
module.exports.execute = function(args) {
	$('body').append('wuffy');
}
},{}],4:[function(require,module,exports){
var emacs = require('./commands/emacs.js');
var whoami = require('./commands/whoami.js');
var cat = require('./commands/cat.js');

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

$(document).ready(function() {
	setTimeout(blinkCursor, 500);
	$('body').keypress(handleInput);
	$('body').keydown(handleWeirdCharacters);
})

function processCommand(command, args) {
	$('body').append('<br />');
	
	switch(command) {
		case 'emacs':
			emacs.execute(args);
			break;
		case 'whoami':
			whoami.execute(args);
			break;
		case 'cat':
			cat.execute(args);
			break;
		default:
			$('body').append('<span class="unknown-command">waff: unknown command ' + command);
			break;
	}
	$('body').append('<br />');
	printPrompt();
}
},{"./commands/cat.js":1,"./commands/emacs.js":2,"./commands/whoami.js":3}],5:[function(require,module,exports){
var cwd = "/home/wuffy/"

module.exports.setCwd = function(newCwd) {
	cwd = newCwd;
}

module.exports.getCwd = function() {
	return cwd;
}
},{}]},{},[4]);
