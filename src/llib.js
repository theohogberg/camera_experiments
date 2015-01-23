define(function () { 
	// Shorthands
	var op = Object.prototype,
		ap =  Array.prototype;

	function isArray (a){
		return op.toString.call(a) === '[object Array]';
	}

	function isObject (a){
		return op.toString.call(a) === '[object Object]';
	}

	function isUdef (a){
		return op.toString.call(a) === '[object Undefined]';
	}

	function isFunction (a){
		return op.toString.call(a) === '[object Function]';
	}	

	function isArguments (a){
		return op.toString.call(a) === '[object Arguments]';
	}	
	
	// My own variation of DC's curry, don't set the second variable of this function
	function partial (fn, l){
		// Get previous arguments
		l = l || [];
		return function () {
			// l = l || []; // can this remember old state?
			// Get arguments provided as array
			var a = ap.slice.apply(arguments);

			// Concatenate arguments to previous arguments
			a.map(function(e) {
				return l.push(e);
			});

			// If there are less arguments than 'fn' requires
			if (l.length < fn.length && isArray(l) ) {
				// return partial with arguments saved
				return partial.call(null, fn, l);
			} else { // Otherwise run the function
				l = null;
				return fn.apply(null, l);
			}
		};
	}

	// Decorator function, only call if this function has an argument provided
	// From regs' js allonge
	function maybe (fn) {
		return function (argument) {
			if (argument != null) { 
				return fn.call(this, argument);
			}
		};
	}

	function compose (last, first) {
		return function (arg) {
			return last(first(arg));
		};
	}

	function addArgFirst (fn, larg) {
		return function () {
			var args = ap.slice.call(arguments, 0);
			return fn.apply(this, [larg].concat(args))
		}
	}

	function addArgLast (fn, rarg) {
		return function () {
			var args = __slice.call(arguments, 0);
			return fn.apply(this, args.concat([rarg]))
		}
	}

	// Aka CrockfordCurry
	function classicCurry(func,args,space) {
		var n  = func.length - args.length; //arguments still to come
		var sa = ap.slice.apply(args); // saved accumulator array
		function accumulator(moreArgs,sa,n) {
			var saPrev = sa.slice(0); // to reset
			var nPrev  = n; // to reset
			for(var i=0;i<moreArgs.length;i++,n--) {
				sa[sa.length] = moreArgs[i];
			}
			if ((n-moreArgs.length)<=0) {
				var res = func.apply(space,sa);
				sa = saPrev;
				n  = nPrev;
				return res;
			} else {
				return function (){
					return accumulator(arguments,sa.slice(0),n);
				};
			}
		}
		return accumulator([],sa,n);
	}	

	return {
		isFunction:isFunction,
		isArray:isArray,
		isUdef:isUdef,
		isObject:isObject,
		isArguments:isArguments,
		classicCurry:classicCurry,
		partial:partial,
		addArgFirst:addArgFirst,
		addArgLast:addArgLast
	};

});


/*Test*/
// function oneTwoThree (a,b,c) {
// 	return a+b+c;
// }
// var maybeCurry = compose(maybe, partial);

// var firstSecondThird = maybeCurry(oneTwoThree);
// var q = firstSecondThird(1);
// var x = firstSecondThird(2);
// var z = firstSecondThird(3);
// var c = firstSecondThird();
// var d = firstSecondThird();
// console.log(z,c,d); //=> 6 undefined undefined