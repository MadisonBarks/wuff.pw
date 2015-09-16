var state = require('../core/state.js');
var fs = require('../core/filesystem.js');

var filesystem;

module.exports.execute = function(args, cb) {
	var dir = args[0];
	
	if(!args || args.length === 0 || !args[0]) {
		dir = state.getCwd();
	}
	
	if(dir.indexOf('/') !== 0) {
		dir = state.getCwd() + dir;
	}
	
	fs.getDirectory(dir, function(directory) {
		for(var element in directory.content) {
			$('body').append(element + "&Tab;");
		}
		cb();
	})
}

function actuallyExecute(args, cb) {
	var dir = args[0];
	
	if(!args || args.length === 0 || !args[0]) {
		dir = state.getCwd();
	}
	
	if(dir.indexOf('/') !== 0) {
		dir = state.getCwd() + dir;
	}
	
	var currentContext = filesystem;
	var dirParts = dir.split('/');
	
	for(var dirPart in dirParts) {
		if(dirParts[dirPart] === "") {
			continue;
		}
		if(currentContext.content) {
			currentContext = currentContext.content[dirParts[dirPart]];
		}
		else {
			currentContext = currentContext[dirParts[dirPart]];
		}
	}
	
	for(var element in currentContext.content) {
		$('body').append(element + "&Tab;");
	}
	
	cb();
}