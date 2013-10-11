(function () {
"use strict";
//Forgets all the users it's seen.

bot.addCommand({
	name : 'forgetSeen',
	fun : function ( args ) {
		bot.memory.set('users', '');
	},
	permission : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Gives the bot a serious case of amnesia. Who are you again? (Only wipes out the list of known users)'
});
}());
