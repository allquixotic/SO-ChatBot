(function () {
"use strict";

var message = "Welcome to the Root Access chat for Super Users! Please don't ask if you can ask or if anyone's around; just ask " +
	"your question, and if anyone's free and interested they'll help.";

function welcome ( name ) {
	return bot.adapter.reply( name ) + " " + message; ;
}

bot.addCommand({
	name : 'welcome',
	fun : function ( args ) {
		if (!args.length) {
			return message;
		}

		return args.send( welcome(args) );
	},
	permission : {
		del : 'NONE'
	},
	description : 'Welcomes a user. `/welcome user`'
});
}());
