(function() {
  "use strict";
  
  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }

  bot.addCommand(bot.CommunityCommand({
    name : 'import',
    fun : function () { 
      bot.memory.data = JSON.parse(b64_to_utf8(args.replace(/\s/g,"")));
      bot.memory.save();
      return "Imported and persisted successfully";
    },
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Imports the persistent memory described in args `/export <exported-content>`'
  }));
})();
