var config = require('./run-headless.config.json');

var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser(config.browser || 'firefox')
    .build(),
    timeouts = driver.manage().timeouts();

timeouts.implicitlyWait(120000).then(function(x)   { return timeouts.pageLoadTimeout(120000); })
    .then(function(x) { return timeouts.setScriptTimeout(120000); })
    .then(function(x) { headlessMain() });

function once (fn) {
	var called = false, res;
	return function () {
		if (called) { return res; }

		called = true;
		res = fn.apply(this, arguments);

		return res;
	};
}

driver.drainQueue = function (cb) {
	var self = driver;

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
	return driver.findElement(By.css('#se-login input[type="email"]')).sendKeys(config.email).then(function () {
        return driver.findElement(By.css('#se-login input[type="password"]')).sendKeys(config.password);
    }).then(function() {
        return driver.findElement(By.css('#se-login input[type="button"]')).click();
    });
}
function injectToChat (driver) {
	driver.get(config.roomUrl).then(function() {
        return driver.sleep(5000);
    }).then(function () {
    	return driver.evaluateScript(function () {
            var script = document.createElement('script');
			script.src = arguments[0] || 'https://raw.github.com/Zirak/SO-ChatBot/master/master.js';
			script.onload = function() {
                if(arguments[1]) {
                    bot.activateDevMode();
                }
			    console.log('Loaded bot');
                bot.adapter.out.add(arguments[2] || 'I will derive!');
			};
			document.head.appendChild(script);
		}, config.botScript, config.devMode, config.botRestartMsg);
    }).then(function() {
                console.log('Injected chatbot.');
            });
}

function headlessMain() {
    return driver.get(config.siteUrl + '/users/login/').then(function() {
        return driver.sleep(5000);
    }).then(function() {
        return driver.getCurrentUrl();
    }).then(function (url) {
        condprom = this;
        if (!/login-add$/.test(url)) {
            console.log('Need to authenticate');
            condprom = seLogin().then(function() {
                return driver.sleep(5000);
            });
        }
        else {
            console.log('Cool, already logged in');
        }
        return condprom;
    }).then(function() {
        return injectToChat(driver);
    }).then(function () {
            driver.drainQueue(function () {
                console.log('Should be done loading stuff.');
                hitTheRepl();
            });
        return this;
    }).then(function() {
            return driver.drainQueue();
    });
}

function hitTheRepl() {
	var repl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log('You are now in a REPL with the remote page. Have fun!');

    //TODO: See if we need to do this with Selenium
    /*
	driver.on('consoleMessage', function (msg) {
		console.log('<', msg);
	});
	driver.on('error', function (msg) {
		console.log('! ', msg);
	});*/

	repl.on('line', function (data) {
		driver.evaluateScript(function () {
			try {
				return eval(arguments[0]);
			}
			catch (e) {
				return e.message;
			}
		}, data).then(function (res) {
			console.log('$', res);
			repl.prompt();
		}).then(function() {
            driver.drainQueue();
        });
	});
	repl.on('close', function () {
		console.log('Leaving the nightmare...');
		driver.quit();
	});

	repl.prompt();
}
