(function () {
"use strict";

var message = bot.config.welcomeMessage;

function welcome ( name ) {
    bot.adapter.out.add( bot.adapter.reply(name) + " " + message, room );
}

            finish();
    seen[ uid ] = true;

        finish();

    function finish () {
bot.addCommand({
    name : 'welcome',
    fun : function ( args ) {
        if (!args.length) {
            return message;
        }

        welcome( args, args.get('room_id') );
    },
    permission : {
        del : 'NONE'
    },
    description : 'Welcomes a user. `/welcome user`'
});
}());
