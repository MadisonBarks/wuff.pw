module.exports.execute = function(args, cb) {
	$('body').append('Currently, the following commands are implemented:')
	$('body').append('<br />')
	$('body').append('&Tab;cat')
	$('body').append('<br />')
	$('body').append('&Tab;dir')
	$('body').append('<br />')
	$('body').append('&Tab;emacs')
	$('body').append('<br />')
	$('body').append('&Tab;whoami')
	$('body').append('<br />')
	$('body').append('&Tab;clear')
	cb();
}