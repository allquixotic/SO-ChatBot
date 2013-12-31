(function() {
  "use strict";
  
  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }

  bot.addCommand({
    name : 'import',
    fun : function (args) { 
      var request = new XMLHttpRequest();
      request.open('GET', args, false);
      request.send(null);
      if (request.status === 200) {
        bot.memory.data = JSON.parse(b64_to_utf8(request.responseText.replace(/\s/g,"")));
        bot.memory.save();
      }
      
      return "Imported and persisted successfully";
    },
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Imports the persistent memory described in args `/export <exported-content>`'
  });
})();
