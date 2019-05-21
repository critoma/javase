
// define our function with the callback argument
function some_function(arg1, arg2, callback) {
	// this generates a random number between
	// arg1 and arg2
	var my_number = arg1 + arg2;
	// then we're done, so we'll call the callback and
	// pass our result
	callback(my_number);
}

// call the function (callback usage) by closure implementation
// jjs ./nashornjs/p001c_functionCallBacks.js
some_function(5, 15, function(num) {
	// this anonymous function will run when the
	// callback is called
	//print("callback called! " + num);
	console.log("callback called! " + num);
});


// it is working in ECMAScript 6+ / node.js 8+
// /opt/software/node-v8.9.4-linux-x64/bin/node ./nashornjs/p001c_functionCallBacks.js
some_function(23, 7, (n) => {
	console.log("lambda callback = " + n);
});

