(function() {
  "use strict";
  
  function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

  bot.addCommand(bot.CommunityCommand({
    name : 'export',
    fun : function(args) {
        args.directreply(utf8_to_b64(JSON.stringify(bot.memory.data)));
      }, 
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Blurts out a message with the persistent memory storage for export `/export`'
  }));
})();
