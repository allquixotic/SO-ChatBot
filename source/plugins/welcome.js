(function () {
"use strict";
//welcomes new users with a link to the room rules - SuperUser implementation

var seen = bot.memory.get( 'users' );

var message = "Welcome to Root Access chat for " + bot.adapter.link("Super User", "http://superuser.com") + "s! " +
	"Please don't ask if you can ask or if anyone's around; just ask " +
	"your question, and if anyone's free and interested they'll help.";
	
var messageForSpecialPeople = "Hey there! You're pretty special, aren't you? :)";

var messageForOwner = "Oh no, master is here! Hide the cookies!";

function welcome ( user, room ) {
	var msg = null;
	if(bot.isOwner( user.id ))
	{
		msg = messageForOwner;
	}
	else if(user.name >= 20 && user.name <= 10000)
	{
		msg = message;
	}
	else
	{
		msg = messageForSpecialPeople;
	}
	
	bot.adapter.out.add(
		bot.adapter.reply( user.name ) + " " + msg, room );
}

function welcomeDirect ( name, room ) {
	bot.adapter.out.add(
		bot.adapter.reply( name ) + " " + message, room );
}

IO.register( 'userregister', function ( user, room ) {
	if (
		Number( room ) !== 118  || seen[ user.id ]
	) {
		if ( semiLegitUser ) {
			finish( true );
		}
		return;
	}

	IO.xhr({
		method : 'GET',
		url : '/users/' + user.id,

		complete : complete
	});

	function complete ( resp ) {
		//I'm parsing html with regexps. hopefully Cthulu won't eat me.
		// <a href="/transcript/17">7</a>
		// <a href="/transcript/17">47.1k</a>
		var chatMessages = /transcript\/118(?:'|")>([\d\.]+)(k?)/.exec( resp );

		if ( !chatMessages || (
			!chatMessages[ 2 ] || parseFloat( chatMessages[1] ) < 2
		)) {
			welcome( user, room );
		}
		finish();
	}

	function finish ( unsee ) {
		if ( unsee ) {
			delete seen[ user.id ];
		}
		else {
			seen[ user.id ] = true;
		}
		bot.memory.save( 'users' );
	}
});

bot.addCommand({
	name : 'welcome',
	fun : function ( args ) {
		if (!args.length) {
			return message;
		}

		welcomeDirect( args, args.get('roomid') );
	},
	permission : {
		del : 'NONE'
	},
	description : 'Welcomes a user. `/welcome user`'
});
}());
