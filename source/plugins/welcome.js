(function () {
"use strict";

var message = "Welcome to the Root Access chat for Super Users! Please don't ask if you can ask or if anyone's around; just ask " +
	"your question, and if anyone's free and interested they'll help.";

function welcome ( name, room ) {
	/*bot.adapter.out.add(*/
	return bot.adapter.reply( name ) + " " + message;/*, room );*/
}

bot.addCommand({
	name : 'welcome',
	fun : function ( args ) {
		if (!args.length) {
			return message;
		}

		return welcome( args, args.get('roomid') );
	},
	permission : {
		del : 'NONE'
	},
	description : 'Welcomes a user. `/welcome user`'
});
}());
