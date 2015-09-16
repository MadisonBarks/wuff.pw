var state = require('../core/state.js');

module.exports.execute = function(args, cb) {
	if(!args || args.length === 0 || !args[0]) {
		$('body').append("This version of cat does not have interactive mode");
		return;
	}
	
	var dir = args[0];
	if(dir.indexOf('/') !== 0) {
		dir = state.getCwd() + dir;
	}
	
	$.get('/assets/filesystem' + dir, function(data) {
		while(data.indexOf('\n') !== -1) {
			data.replace('\n', '<br />');
		}
		$('body').append(data);
		cb();
	})
}