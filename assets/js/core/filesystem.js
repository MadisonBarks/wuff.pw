var filesystem;

function getDir(dir, cb) {
	if(dir === '/') {
		return filesystem;
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
	cb(currentContext);
}

module.exports.getDirectory = function(directory, cb) {
	if(!filesystem) {
		$.get('/assets/data/files.json', function(data) {
			filesystem = data;
			
			getDir(directory, cb);
		})
	}
	
	getDir(directory, cb);
}