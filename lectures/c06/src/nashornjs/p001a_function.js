
//# FunctionCallBack.js

// define our function - NOT callback 
function some_function0(arg1, arg2) {
	// this generates a random number between
	// arg1 and arg2
	var my_number = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
	return my_number;
}

var rval = some_function0(2, 8);
print('rval = ' + rval);


// it is not so clear calback, but recursivity
// define our function with the callback argument
function some_function1(arg1, arg2, callback) {
	// this generates a random number between
	// arg1 and arg2
	var my_number = Math.ceil(Math.random() *
		(arg1 - arg2) + arg2);
	// then we're done, so we'll call the callback and
	// pass our result

	callback(my_number);
	print("some_function1 finished");
}

function fcalled2(num) {
	// this anonymous function will run when the
	// callback is called
	print("callback called! " + num);
}

// call the function
some_function1(5, 15, fcalled2);


// define our function with the callback argument
function some_function(arg1, arg2, callback) {
	// this generates a random number between
	// arg1 and arg2
	var my_number = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
	// then we're done, so we'll call the callback and
	// pass our result
	callback(my_number);
}

// call the function (callback usage) by implementing closure 
some_function(5, 15, function(num) {
	// this anonymous function will run when the
	// callback is called
	print("callback called! " + num);
});
