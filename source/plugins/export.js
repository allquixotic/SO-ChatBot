(function() {
  function export(args) {
    var ret = [];
    ret.push(encodeURI(btoa(JSON.stringify(bot.memory.data))));
    return ret;
  };


  bot.addCommand(bot.CommunityCommand({
    name : 'export',
    fun : export,
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Blurts out a message with the persistent memory storage for export `/export`'
  }));
})();
