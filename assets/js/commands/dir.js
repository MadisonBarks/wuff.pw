var state = require('../core/state.js');

var filesystem;

module.exports.execute = function(args, cb) {
	if(!filesystem) {
		$.get('/assets/data/files.json', function(data) {
			if(typeof data === 'string') {
				filesystem = JSON.parse(data);
			}
			else {
				filesystem = data;
			}
			
			actuallyExecute(args, cb);
		})
	}
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
		currentContext = currentContext[dirParts[dirPart]];
	}
	
	for(var element in currentContext.content) {
		$('body').append(element + "&Tab;");
	}
	
	cb();
}