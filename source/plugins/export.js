(function() {
  function export(args) {
    var ret = [];
    
    return ret;
    
    function export() {
      ret.push(encodeURI(atob(JSON.stringify(bot.memory.data))));
    };

  };


  bot.addCommand(bot.CommunityCommand({
    name : 'export',
    fun : export,
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Blurts out a message with the persistent memory storage for export `/export`'
  }));
})();
