(function () {
"use strict";
//Forgets all the users it's seen.

bot.addCommand({
	name : 'forgetSeen',
	fun : function ( args ) {
		bot.memory.get('users').length = 0;
	},
	permission : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Gives the bot a serious case of amnesia. Who are you again? (Only wipes out the list of known users)'
});
}());
