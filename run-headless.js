var Nightmare = require('nightmare'),
	readline = require('readline');

var hound = new Nightmare({
	cookiesFile: 'cookies.jar'
});

/***********	Change me!	  ***********/
var config = {
	email:	  'you can guess',
	password: 'what these are',

	siteUrl: 'https://stackoverflow.com',
	roomUrl: 'https://chat.stackoverflow.com/rooms/1'
};

function once (fn) {
	var called = false, res;
	return function () {
		if (called) { return res; }

		called = true;
		res = fn.apply(this, arguments);

		return res;
	};
}

hound.drainQueue = function (cb) {
	var self = hound;

	setTimeout(next, 0);
	function next(err) {
		var item = self.queue.shift();
		if (!item) {
			cb && cb(err, self);
			return;
		}

		var method = item[0],
			args = item[1];
		args.push(once(next));
		method.apply(self, args);
	}
};

function seLogin () {
	hound
		.type('#email', config.email)
                .wait(5000)
                .type('#password', config.password)
                .wait(5000)
                .click('#submit-button')
                .wait(10000)
                .screenshot('pics/login.png');
}
function injectToChat (hound) {
	hound
		.goto(config.roomUrl)
		.wait()
		.screenshot('pics/chat.png')
		.evaluate(function () {
			var script = document.createElement('script');
			script.src = 'https://raw.github.com/Zirak/SO-ChatBot/master/master.js';
			script.onload = function() {
				console.log('Loaded bot');
				bot.adapter.out.add('ChatBot John Cavil has loaded and is ready for commands. Type !!help to learn more about me.');
			};
			document.head.appendChild(script);
		}, function () {
			console.log('Injected chatbot.');
		});
}

hound
	.goto(config.siteUrl + '/users/login/')
	.screenshot('pics/pre-login.png')
	.wait(5000)
	.url(function (url) {
		if (!/login-add$/.test(url)) {
			console.log('Need to authenticate');
			hound.use(seLogin);
		}
		else {
			console.log('Cool, already logged in');
		}

		hound.use(injectToChat);
		hound.drainQueue(function () {
			console.log('Should be done loading stuff.');
			hitTheRepl();
		});
	})
	.setup(function () {
		hound.drainQueue();
	});

function hitTheRepl() {
	var repl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log('You are now in a REPL with the remote page. Have fun!');

	hound.on('consoleMessage', function (msg) {
		console.log('<', msg);
	});
	hound.on('error', function (msg) {
		console.log('! ', msg);
	});

	repl.on('line', function (data) {
		hound.evaluate(function (code) {
			try {
				return eval(code);
			}
			catch (e) {
				return e.message;
			}
		}, function (res) {
			console.log('$', res);
			repl.prompt();
		}, data).drainQueue();
	});
	repl.on('close', function () {
		console.log('Leaving the nightmare...');
		hound.teardownInstance();
	});

	repl.prompt();
}
