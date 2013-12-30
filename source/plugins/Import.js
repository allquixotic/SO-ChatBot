(function() {
  function import(args) {
    var ret = [];
    
    return ret;
    
    function import() {
      bot.memory.data = JSON.parse(decodeURI(btoa(args)));
      bot.memory.save();
      ret.push('Imported and persisted succesfully!');
    };

  };


  bot.addCommand(bot.CommunityCommand({
    name : 'import',
    fun : import,
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Imports the persistent memory described in args `/export <exported-content>`'
  }));
})();
