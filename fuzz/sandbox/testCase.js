var currentTest;
var passed;
var failed;
var fixture = null;
var debug = false;

if(typeof console == "undefined") {
	var fvoid = function() {};
	console = {
		debug: fvoid,
		warn: fvoid,
		info: fvoid,
		error: fvoid
	};
}

var log = {
	debug: function(message) {
		if(debug)
			console.debug(message);
	},
	info: function(message) {
		console.info(message);
		$.iLogger.log(message, 'notice');
	},
	warn: function(message) {
		console.warn(message);
		$.iLogger.log(message, 'warning');
	},
	error: function(message) {
		console.error(message);
		if(typeof message == "Object") {
			$.iLogger.logObj(message);
		} else {
			$.iLogger.log(message, 'error');
		}
	} 
};

function assertEquals(expected, actually, message) {
	if(expected == actually) {
		if(message)
			log.debug(message);
		passed++;
	} else {
		var output = "expected: '" + expected + "', actually: '" + actually + "'"
		if(message)
			output = message + ", " + output;
		log.warn(output);
		failed++;
	}
}

function assertTrue(expression) {
	if(expression) {
		passed++;
	} else {
		failed++;
	}
}

function assertFalse(expression) {
	assertTrue(!expression);
}

function assertSelection(expectedIds, jQuerySelection) {
	var expected = [];
	for ( var i = 0; i < expectedIds.length; i++ )
		expected.push( document.getElementById( expectedIds[i] ) );
	
	var actually = jQuerySelection.get();
	
	var result = true;
	if ( expected && actually && expected.length == actually.length ) {
		for ( var i in expected )
			if ( expected[i] != actually[i] )
				result = false;
	} else
		result = false;
	if(result) {
		passed++;
	} else {
		log.warn("Wrong selection");
		log.warn(expectedIds);
		log.warn(jQuerySelection);
		failed++;
	}
}

/**
 * Call before starting tests that modify the fixture.
 * Pass the ID of the container that contains the fixture.
 */
function fix(id) {
	fixture = {
		id: id,
		content: document.getElementById(id).innerHTML
	};
}

/**
 * If fixture(id) was called, the fixture is reset to unmodified state
 * between each test. You can call reset() within a test.
 */
function reset() {
	if(fixture) {
		document.getElementById(fixture.id).innerHTML = fixture.content;
	}
}

function test(name, test) {
	var startTime = new Date();
	passed = 0;
	failed = 0;
	reset();
	try {
		test();
	} catch(exception) {
		log.error("Test " + name + " failed, exception follows");
		log.error(exception);
		return;
	}
	var runTime = new Date() - startTime;
	var result = "Test for " + name + " took " + runTime + " milliseconds, " + 
			 passed + " assertions passed, " + failed + " assertions failed";
	if(failed == 0) {
		log.info(result);
	} else {
		log.warn(result);
	}
}