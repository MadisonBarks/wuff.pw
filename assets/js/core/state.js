var cwd = "/home/wuffy/"

module.exports.setCwd = function(newCwd) {
	cwd = newCwd;
}

module.exports.getCwd = function() {
	return cwd;
}